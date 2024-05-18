import type { Stream } from 'stream';
import { IncomingMessage } from 'http';
import type { NextApiRequest, NextApiResponse } from 'next';

import fs, { ReadStream } from 'fs';
import { SongMetadata } from '@/types';
import https from 'https';
import { NextResponse } from 'next/server';
import axios from 'axios';

const songManifest = require('@/manifest.json');
const map: Map<string, SongMetadata> = new Map(songManifest.map((s: SongMetadata) => [s.id, s]));

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  const { id, source } = req.query;
  if (!id || !source) {
    res.status(400).send('Must provide both a source and an id.');
    return;
  } else if (Array.isArray(id) || Array.isArray(source)) {
    res.status(400).send('Must only provide a single id and source.');
    return;
  } else if (!['builtin'].includes(source)) {
    res.status(400).send(`Received invalid source: ${source}`);
    return;
  }

  let stream: Stream;
  if (source === 'builtin') {
    const path = map.get(id)?.file;
    if (!path) {
      res.status(404).send(`Could not find midi with id: "${id}"`);
    }
    res.writeHead(200, { 'Content-Type': 'audio/midi' });

    // In development we have access to the filesystem but can't hit localhost with https.
    // When deployed we don't have access to fs, but can proxy to the hosted /public.
    if (process.env.NODE_ENV === 'development') {
      stream = fs.createReadStream(`public/${path}`);
      console.log(stream);
      console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!Testing!!!!!!!!!");
      console.log(`Requesting URL: https://${process.env.VERCEL_URL}/${path}`);
      let streamError = await get(`https://${process.env.VERCEL_URL}/${path}`);
      console.log(streamError);
      console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
    } else {

      // stream = fs.createReadStream(`public/${path}`);
      // console.log(stream);
      console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!Testing!!!!!!!!!");
      console.log(`Requesting URL: https://${process.env.VERCEL_URL}/${path}`);
      // let streamError = await get(`https://${process.env.VERCEL_URL}/${path}`);
      // let streamError = fs.createReadStream(`https://${process.env.VERCEL_URL}/${path}`);
      // stream = fs.createReadStream(`https://${process.env.VERCEL_URL}/${path}`);
      stream = await get(`https://${process.env.VERCEL_URL}/${path}`);
      console.log(stream);

      ///////////////////////////////////////////

      // stream = fs.createReadStream(`public/${path}`);
      /*
      console.error(`Requesting URL: https://${process.env.VERCEL_URL}/${path}`);
      console.log(`Requesting URL: https://${process.env.VERCEL_URL}/${path}`);

      console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!Testing!!!!!!!!!");
      stream = await get(`https://${process.env.VERCEL_URL}/${path}`);
      console.log(stream);
      console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
      */
      // stream = await get(`https://${process.env.VERCEL_URL}/${path}`);
      // stream = fs.createReadStream(`https://${process.env.VERCEL_URL}/${path}`);

    }
  } else {
    console.error(`Requesting URL: Not Found`);
    res.status(400).send('Invalid source');
    return;
  }
  return proxy(stream, res);
}


// async function getStream(url: string): Promise<NodeJS.ReadableStream> {
async function getStream(url: string): Promise<IncomingMessage> {
  const response = await axios.get(url, { responseType: 'stream' });
  return response.data;
}

async function get(url: string): Promise<IncomingMessage> {
  return new Promise((resolve, reject) => {
    const req = https.get(url);
    req.on('response', (response) => resolve(response));
    req.on('error', (err) => reject(err));
  });
}

async function proxy(stream: Stream, res: NextApiResponse<any>) {
  return new Promise((resolve, reject) => {
    stream.on('end', () => resolve(undefined));
    stream.on('error', (e) => reject(e));
    stream.pipe(res);
  });
}
