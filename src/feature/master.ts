import type { Express, Request, Response } from 'express';
import { setTimeout } from 'timers/promises';
import { Client } from 'undici';
import { i18n, validators } from './config.js';
import { HttpError, headers } from './helpers.js';
import express = require('express');

export default {};

export const port = 9001;
export const uri = '/translate';
export const server: Express = express();
const cli = new Client(`${i18n.url.hostname}`);

server.get(
  uri,
  (req: Request<unknown, unknown, Master.ResBody, Master.ReqQuery>, res) => {
    masterService(req, res).catch((e: Error) => {
      console.error(e);
      if (e instanceof HttpError) res.status(e.code).send(e);
      else res.sendStatus(500);
    });
  },
);

const masterService = async (
  req: Request<unknown, unknown, Master.ResBody, Master.ReqQuery>,
  res: Response,
): Promise<void> => {
  const start = Date.now();

  const { text } = req.query;
  validators.text(text);
  const { from } = req.query;
  validators.lang(from, 'from');
  const { to } = req.query;
  validators.lang(to, 'to');

  const { languages, translate } = i18n.url.paths;

  const langRes = await cli.request({ method: 'GET', path: languages });
  const langs = (await langRes.body.json()) as I18nResponse.Language[];
  // TODO extra: cache

  if (!langs.some(l => l.code === from))
    throw new HttpError(400, "'from' parameter is unsupported.");

  const path = translate;
  const body = JSON.stringify({ q: text, source: from, target: to });
  const translRes = await cli.request({ method: 'POST', path, body, headers });
  const translation = (await translRes.body.json()) as I18nResponse.Translate;

  await setTimeout(Math.random() * 3000);

  const responseTime = Date.now() - start;
  res.send(200).send({ from, originalText: text, responseTime, translation });
};
