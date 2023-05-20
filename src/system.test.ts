/* eslint-disable @typescript-eslint/return-await */
import type { Server } from 'http';
import { createHttpTerminator, type HttpTerminator } from 'http-terminator';
import { server as master, port } from './feature/master.js';
import { server as slave, uri } from './feature/slave.js';
import supertest = require('supertest');

export default {};

let agent: supertest.SuperTest<supertest.Test>;
let slaveSrv: Server;
let slaveTerm: HttpTerminator;
let masterTerm: HttpTerminator;

beforeEach(done => {
  const masterSrv = master.listen(port, () => {
    masterTerm = createHttpTerminator({ server: masterSrv });
    slaveSrv = slave.listen(() => {
      agent = supertest(slaveSrv);
      slaveTerm = createHttpTerminator({ server: slaveSrv });
      done();
    });
  });
});

afterEach(async () => {
  await slaveTerm.terminate();
  await masterTerm.terminate();
});

describe(`GET /${uri}?text[string]&from[string]:`, (): void => {
  it.each([
    { text: '谢谢', from: 'zh' },
    { text: 'Bom dia', from: 'pt' },
    { text: 'Dzień dobry', from: 'pl' },
  ])(
    `GIVEN query parameters [%p] 
       WHEN translating 
       THEN return HTTP status 200
        AND response body has provided 'text' and 'from' parameters
        AND return the four supported translations
        AND response time is the sum from each returned translation.
      `,
    async query =>
      agent
        .get(uri)
        .query(query)
        .expect(200)
        .then(res => {
          const body = res.body as Slave.ResBody;
          expect(body.originalText).toBe('谢谢');
          expect(body.from).toBe('zh');
          expect(body.translations).toContain([
            { to: 'en', translation: 'Thanks' },
            { to: 'es', translation: 'Gracias' },
            { to: 'fr', translation: 'Merci' },
            { to: 'nl', translation: 'Bedankt' },
          ]);
          expect(body.responseTime).toBe(
            body.translations
              .map(t => t.responseTime)
              .reduce((sum, t) => sum + t, 0),
          );
        }),
  );

  it.each([
    { text: undefined, message: "'text' is required." },
    { text: '', message: "'text' is in blank." },
  ])(
    `GIVEN query parameters [%p]
      WHEN translating 
      THEN return HTTP status 400.
     `,
    async ({ text, message }) =>
      agent.get(uri).query({ text }).expect(400).expect({ code: 400, message }),
  );

  it.each([
    { from: undefined, message: "'from' is required." },
    { from: 'invalid', message: "'from' format invalid." },
    { from: 'de', message: "'from' is unsupported." },
  ])(
    `GIVEN query parameters [%p]
      WHEN translating 
      THEN return HTTP status 400.
     `,
    async ({ from, message }) =>
      agent
        .get(uri)
        .query({ text: 'Hello', from })
        .expect(400)
        .expect({ code: 400, message }),
  );
});
