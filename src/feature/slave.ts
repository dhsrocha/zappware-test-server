import type { Express, Request, Response } from 'express';
import { Client, type Dispatcher } from 'undici';
import { i18n, validators } from './config.js';
import { HttpError, headers } from './helpers.js';
import { port as masterPort, uri as masterUri } from './master.js';
import express = require('express');

export default {};

export const port = 9002;
export const uri = '/translateMulti';
export const server: Express = express();

const hostname = 'http://localhost'; // TODO Parameterize
const cli = new Client(`${hostname}:${masterPort}`);

server.get(
  uri,
  (req: Request<unknown, unknown, Slave.ResBody, Slave.ReqQuery>, res) => {
    slaveService(req, res).catch((e: Error) => {
      console.error(e);
      if (e instanceof HttpError) res.status(e.code).send(e);
      else res.sendStatus(500);
    });
  },
);

const slaveService = async (
  req: Request<unknown, unknown, Slave.ResBody, Slave.ReqQuery>,
  res: Response,
): Promise<void> => {
  const { text } = req.query;
  validators.text(text);
  const { from } = req.query;
  validators.lang(from, 'from');

  const retrieved = i18n.supported
    .map(to => encodeURI(`${masterUri}?text=${text}&from=${from}&to=${to}`))
    .map(path => ({ method: 'GET', path } satisfies Dispatcher.RequestOptions))
    .map(async req => await cli.request({ ...req, headers }))
    .map(async res => (await (await res).body.json()) as Master.ResBody);

  const all = await Promise.all(retrieved);
  const responseTime = all
    .map(r => r.responseTime)
    .reduce((sum, v) => sum + v, 0);

  res.status(200);
  res.write({ originalText: text, from, responseTime, translations: all });
};
