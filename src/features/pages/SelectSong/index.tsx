'use client'

import * as React from 'react';
import { useState, useEffect } from 'react';
import { formatTime } from '@/utils';
import { SongPreviewModal } from '@/features/SongPreview';
import { AppBar, Modal, Sizer } from '@/components';
import { DifficultyLabel, SongMetadata } from '@/types';
import { useEventListener } from '@/hooks';
import { Plus } from '@/icons';
import { SearchBox } from './components/Table/SearchBox';
import clsx from 'clsx';
import { UploadForm, Table } from './components';
import Head from 'next/head';
import { useSongManifest } from '@/features/data';
import { getUploadedLibrary } from '@/features/persist';
import { useHydrateAtoms } from 'jotai/utils';
import { midishareMetadataAtom } from '@/features/data/library';

function getDifficultyLabel(s: number): DifficultyLabel {
  if (!s) {
    return '-';
  }

  const difficultyMap: { [d: number]: DifficultyLabel } = {
    0: '-',
    10: 'Easiest',
    20: 'Easier',
    30: 'Easy',
    40: 'Medium',
    50: 'Hard',
    60: 'Hardest',
    65: 'Hardest',
  };
  return difficultyMap[s];
}

// TODO: after an upload, scroll to the newly uploaded song / make it focused.
export default function SelectSongPage({ midishareMetadata }: any) {
  const [songs, addSongs] = useSongManifest();
  const [isUploadFormOpen, setUploadForm] = useState<boolean>(false);
  const [selectedSongId, setSelectedSongId] = useState<any>('');
  const selectedSongMeta = songs.find((s) => s.id === selectedSongId);
  const [search, setSearch] = useState('');
  useHydrateAtoms([[midishareMetadataAtom, midishareMetadata]]);

  const uploadedLibrary = getUploadedLibrary();
  useEffect(() => {
    addSongs(uploadedLibrary);
  }, [uploadedLibrary, addSongs]);

  useEventListener<KeyboardEvent>('keydown', (event) => {
    if (event.key === 'Escape') {
      setUploadForm(false);
    }
  });

  const handleAddNew = (e: any) => {
    setUploadForm(true);
    e.stopPropagation();
  };

  const handleCloseAddNew = () => {
    setUploadForm(false);
  };

  return (
    <>
      <Head>
        <title>Simpler Piano: Song Catalog</title>
      </Head>
      <SongPreviewModal
        show={!!selectedSongId}
        songMeta={selectedSongMeta}
        onClose={() => {
          setSelectedSongId(null);
        }}
      />
      <Modal show={isUploadFormOpen} onClose={handleCloseAddNew}>
        <UploadForm onClose={handleCloseAddNew} />
      </Modal>
      <div className="bg-white w-full h-screen flex flex-col">
        <AppBar />
        <div className="flex h-screen">
          <div className="w-14 bg-gradient-to-b from-black to-white text-white px-4 py-2">
            {/* Left app bar content */}
          </div>
          {/* <div className="flex-grow"> */}
            {/* Your page content goes here */}
            <div className="p-6 mx-auto max-w-screen-lg flex flex-col flex-grow w-full py-20">
              <h2 className="text-3xl">Song Library</h2>
              <Sizer height={8} />
              <h3 className="text-base">
                {' '}
                Please choose a Song
              </h3>
              <Sizer height={24} />
              <div className="flex flex-row-reverse gap-4">
                <SearchBox placeholder={'Song: Title or Artist ?'} onSearch={setSearch} />
                <button
                  className={clsx(
                    'hidden sm:flex whitespace-nowrap flex-nowrap',
                    'py-2 px-4 items-center rounded-md gap-1',
                    'bg-black opacity-80 transition hover:opacity-50 text-white',
                  )}
                  onClick={handleAddNew}
                >
                  <span>Upload</span>
                  <Plus width={20} height={20} />
                </button>
              </div>
              <Sizer height={32} />
              <Table
                columns={[
                  { label: 'Title', id: 'title', keep: true },
                  { label: 'Artist', id: 'artist', keep: true },
                  // { label: 'Difficulty', id: 'difficulty', format: getDifficultyLabel as any },
                  {
                    label: 'Length',
                    id: 'duration',
                    format: (n) => formatTime(Number(n)),
                  },
                  { label: 'Source', id: 'source' },
                ]}
                getId={(s: SongMetadata) => s.id}
                rows={songs}
                filter={['title', 'artist']}
                onSelectRow={setSelectedSongId}
                search={search}
              />
            </div>
          {/* </div> */}
          <div className="w-14 bg-gradient-to-b from-white to-black text-white px-4 py-2">
            {/* Right app bar content */}
          </div>
        </div>
        <div className="h-14 bg-gradient-to-r from-white to-black text-white px-4 py-2"></div>
      </div>
    </>
  );
}
