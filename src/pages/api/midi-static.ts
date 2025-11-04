import type { NextApiRequest, NextApiResponse } from 'next';
import type { Stream } from 'stream';
import https from 'https';
import fs from 'fs';

// Streams a MIDI file from the public folder ensuring Content-Type is audio/midi.
// Usage: /api/midi-static?path=music/some/file.mid
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const pathParam = req.query.path;
    if (!pathParam || Array.isArray(pathParam)) {
      res.status(400).send('Query param "path" is required.');
      return;
    }

    // Normalize and validate path - only allow files under public/music and with .mid extension
    const normalized = pathParam.replace(/^\/+/, ''); // remove leading slashes
    if (!normalized.startsWith('music/') || !normalized.toLowerCase().endsWith('.mid')) {
      res.status(400).send('Only paths under music/ ending in .mid are allowed.');
      return;
    }

    res.writeHead(200, { 'Content-Type': 'audio/midi' });

    if (process.env.NODE_ENV === 'development') {
      const abs = `public/${normalized}`;
      const stream = fs.createReadStream(abs);
      stream.on('error', (e) => {
        console.error('Error reading local MIDI:', e);
        if (!res.headersSent) res.status(404);
        res.end('Not found');
      });
      stream.pipe(res);
      return;
    }

    // In production, stream from the deployed static asset URL
    const url = `https://${process.env.VERCEL_URL}/${normalized}`;
    const upstream = await get(url);
    upstream.on('error', (e) => {
      console.error('Error fetching remote MIDI:', e);
      if (!res.headersSent) res.status(502);
      res.end('Upstream error');
    });
    upstream.pipe(res);
  } catch (e) {
    console.error(e);
    res.status(500).send('Internal error');
  }
}

function get(url: string): Promise<Stream> {
  return new Promise((resolve, reject) => {
    const req = https.get(url);
    req.on('response', (response) => resolve(response));
    req.on('error', (err) => reject(err));
  });
}
