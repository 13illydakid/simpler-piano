import { Home } from '@/features/pages';

// TODO: Remove waterfall by sending needed MIDI data for the page via initial server render.
//       Need to encode MIDI in a string. Base64 can help (1.37x space), unsure if there are more efficient ways.

import { SongMetadata, SongSource } from '@/types'
import { GetStaticProps } from 'next'
import fs from 'fs'

export const FEATURED_SONGS: { [id: string]: { source: SongSource; id: string } } = {
  counting: { source: 'builtin', id: 'fa7a5d0bf5012a4cb4a19f1de2e58b10' },
  sindria: { source: 'builtin', id: 'b50ee876b785c66a70dba3159d21e81e' },
  lullaby: { source: 'builtin', id: 'bb4edb91d3a12b8c745e59b8435f74c2' },
};

export const getStaticProps: GetStaticProps = async () => {
  const featuredSongIds = new Set(Object.values(FEATURED_SONGS).map((s) => s.id))
  const featuredSongBytes: ArrayBuffer[] = require('@/manifest.json')
    .filter((s: SongMetadata) => featuredSongIds.has(s.id))
    .map((s: SongMetadata) => {
      const path = `public/${s.file}`
      const buffer = new Uint8Array(fs.readFileSync(path)).buffer
      const base64String = btoa(String.fromCharCode(...new Uint8Array(buffer)))
      return base64String
    })

  return { props: { featuredSongBytes } }
}

export default Home;
