import type { Stream } from 'stream';
import { IncomingMessage } from 'http';
import type { NextApiRequest, NextApiResponse } from 'next';
// import fs, { ReadStream } from 'fs';
import fs from 'fs';
import { SongMetadata } from '@/types';
import https from 'https';
import { NextRequest, NextResponse } from 'next/server';

const songManifest = require('@/manifest.json');
const map: Map<string, SongMetadata> = new Map(songManifest.map((s: SongMetadata) => [s.id, s]));


export default async function handler(req: NextRequest, res: NextResponse<any>) {
  const { searchParams } = new URL(req.url);
  const { id, source } = Object.fromEntries(searchParams);
  const supportedSources = new Set(['builtin', 'midishare']);

  if (!id || !source) {
    return new Response('Must provide both a a source and an id.', { status: 400 });
  } else if (Array.isArray(id) || Array.isArray(source)) {
    return new Response('Must only provide a single id and source.', { status: 400 });
  } else if (!supportedSources.has(source)) {
    return new Response(`Received invalid source: ${source}`, { status: 400 });
  }

  if (source === 'midishare') {
    return fetch(`https://assets.midishare.dev/scores/${id}/${id}.mid`);
  }
  const path = map.get(id)?.file;
  if (!path) {
    return new Response(`Could not find midi with id: "${id}"`, { status: 404 });
  }

  if (process.env.NODE_ENV === 'development') {
    const body = fs.readFileSync(`public/${path}`);
    const basename = path.substring(path.lastIndexOf('/') + 1);
    return new Response(body, {
      headers: {
        'Content-Type': 'audio/midi',
        'Content-Disposition': `attachment; filename="${basename}"`,
      },
    });
  } else {
    console.log(`Requesting URL: https://${process.env.VERCEL_URL}/${path}`);
    return fetch(`https://${process.env.VERCEL_URL}/${path}`);
  }
}



/*
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
  // if (source === 'builtin' || source === 'midishare') {
  if (source === 'builtin') {
    const path = map.get(id)?.file;
    if (!path) {
      res.status(404).send(`Could not find midi with id: "${id}"`);
      return;
    }
    res.writeHead(200, { 'Content-Type': 'audio/midi' });
    // In development we have access to the filesystem but can't hit localhost with https.
    // When deployed we don't have access to fs, but can proxy to the hosted /public.
    if (process.env.NODE_ENV === 'development') {
      stream = fs.createReadStream(`public/${path}`);
      console.log(`Requesting URL: https://${process.env.VERCEL_URL}/${path}`);
    } else {
      // When deployed, make a GET request to the file in the public directory
      stream = await get(`https://${process.env.VERCEL_URL}/${path}`);
      return proxy(stream, res);
    }
  } else {
    console.error(`Requesting URL: Not Found`);
    res.status(400).send('Invalid source');
    return;
  }
  // return proxy(await get(`https://${process.env.VERCEL_URL}/music/songs`), res);
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
*/
