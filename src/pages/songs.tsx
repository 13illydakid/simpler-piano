import type { GetStaticProps } from 'next';
// import { SelectSong } from '@/features/pages';
import ClientPage from '@/features/pages/SelectSong/index';
import { SongMetadata } from '@/types';
import axios from 'axios';
import manifest from '@/manifest.json';
import { getKey } from '@/utils';

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

async function getMidishareManifest() {
  try {
    const revalidate = 60 * 60;
    return (await fetch('https://midishare.dev/api/midis', { next: { revalidate } })).json();
  } catch (err: any) {
    console.error(`${new Date().toUTCString()}: Error reaching midishare.dev`, err);
    return {};
  }
}

async function getStaticProps() {
  const midishareMetadata: SongMetadata[] = Object.values(await getMidishareManifest());
  for (const song of midishareMetadata) {
    song.source = 'midishare';
  }
  const metadataByKey = midishareMetadata.map((m) => [getKey(m.id, m.source), m]);
  return metadataByKey;
}

export default async function SelectSong() {
  const midishareMetadata = await getStaticProps();
  const props = { midishareMetadata };
  return <ClientPage {...props} />
}



/*
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
    return (await fetch('https://midishare.dev/api/midis')).json();
    // return {};
  } catch (err: any) {
    console.error(`${new Date().toUTCString()}: Error reaching songs folder`)
    return {}
  }
}

export default SelectSong;
*/
