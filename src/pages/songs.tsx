import type { GetStaticProps } from 'next';
import { SelectSong } from '@/features/pages';
import { SongMetadata } from '@/types';

export type MidishareManifestSong = {
  title: string
  artist?: string
  uploader: string
  uploadedAt: Date // TODO: make a date type?
  youtubeId?: string
  originalSourceUrl?: string
  originalSourceType: 'musescore' | 'flat.io' | 'other'
  originalArranger: string
  duration: string
  midiUrl: string
}

export const getStaticProps: GetStaticProps = async () => {
  const midishareMetadata: SongMetadata[] = Object.values(await getMidishareManifest())
  for (const song of midishareMetadata) {
    song.source = 'midishare'
  }

  return {
    props: { songMetadata: midishareMetadata },
    revalidate: 60 * 60, // once an hour.
  }
}

// Page should operate even if/when midishare is down.

async function getMidishareManifest() {
  try {
    return (await fetch('https://localhost:3000/public/api/midis')).json()
    // return {};
  } catch (err: any) {
    console.error(`${new Date().toUTCString()}: Error reaching songs folder`)
    return {}
  }
}

export default SelectSong;
