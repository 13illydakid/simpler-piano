import { SelectSong } from '@/features/pages';

// Thin route page: SelectSong fetches and manages its own data.
export default SelectSong;

/*
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
*/
// Removed legacy midishare SSR scaffolding
