import { AppBar, Sizer } from '@/components';
import Link from 'next/link';
import React, { useState } from 'react';
import { Pause, Play } from '@/icons';
import clsx from 'clsx';
import { SongPreview } from '../../SongPreview/SongPreview';
import { useEventListener, useOnUnmount, usePlayerState } from '@/hooks';
import Head from 'next/head';
import { SongSource } from '@/types';

export const FEATURED_SONGS: { [id: string]: { source: SongSource; id: string } } = {
  counting: { source: 'builtin', id: 'fa7a5d0bf5012a4cb4a19f1de2e58b10' },
  sindria: { source: 'builtin', id: 'b50ee876b785c66a70dba3159d21e81e' },
  lullaby: { source: 'builtin', id: 'bb4edb91d3a12b8c745e59b8435f74c2' },
};

export default function Home() {
  const [playerState, playerActions] = usePlayerState();
  const [currentSong, setCurrentSong] = useState<keyof typeof FEATURED_SONGS>('counting');
  const { id: songId, source } = FEATURED_SONGS[currentSong];

  useEventListener('keydown', (event: Event) => {
    const e = event as KeyboardEvent;
    if (e.key === ' ') {
      e.preventDefault();
      return playerActions.toggle();
    }
  });

  useOnUnmount(playerActions.pause);

  return (
    <>
      <Head>
        <title>Simpler Piano</title>
      </Head>
      {/* <div className="frame"> */}
        <div className="relative flex flex-col w-full min-h-[800px,100vh] text-white">
          <AppBar />
          <div className="flex h-screen">
            <div className="w-14 bg-gradient-to-b from-black to-white text-white px-4 py-2">
              {/* Left app bar content */}
            </div>
            <div className="flex-grow bg-gray-100">
              {/* Your page content goes here */}
              <div className="p-8 bg-gradient-to-r from-white to-black flex flex-col items-center text-center w-full">
                <br /> 
                <br />
                <br />
                <br />
                <Sizer height={8} />
                <h3 className="text-reponsiveXl">
                  Works just like Synthesia.
                  <br />
                  Plug in your MIDI keyboard piano and enjoy!
                </h3>
                <br />
                <Sizer height={75 + 18} />
              </div>
              <div className='flex flex-col items-center'>
                <div
                  className={clsx(
                    'relative w-3/4 max-w-[950px] h-[500px] self-center  mt-[-75px]',
                    // 'relative w-3/4 max-w-[760px] h-[400px] self-center  mt-[-75px]',
                    'overflow-hidden rounded-lg bg-gray-[#2e2e2e]',
                    'shadow-xl',
                  )}
                  style={{ minWidth: 'min(100vw - 40px, 400px)' }}
                >
                  <SongPreview songId={songId} source={source} />
                  <div className="absolute top-0 w-full h-[50px] bg-black/80 flex items-center justify-center">
                    <button
                      className={clsx(
                        'gap-1 items-center hover:text-gray-300',
                        'flex absolute left-5 sm:static',
                        playerState.canPlay ? 'text-white' : 'text-gray-300',
                      )}
                      onClick={playerActions.toggle}
                    >
                      {playerState.playing ? (
                        <>
                          <Pause size={24} /> Pause
                        </>
                      ) : (
                        <>
                          <Play size={24} />
                          Play
                        </>
                      )}
                    </button>
                    <div
                      className="absolute right-5 top-1/2 -translate-y-1/2 text-white"
                      style={{ transform: 'translateY(-50%)' }}
                    >
                      <select
                        style={{
                          padding: 10,
                          backgroundColor: '#2e2e2e',
                          color: 'white',
                          fontSize: 14,
                          fontWeight: 700,
                          // border: 'none',
                          borderRadius: '5px',
                        }}
                        onChange={(e) => {
                          setCurrentSong(e.target.value as any);
                        }}
                      >
                        <option value="counting">Counting Stars</option>
                        <option value="sindria">L&apos;Arabesque Sindria</option>
                        <option value="lullaby">Isabella&apos;s Lullaby</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              <Sizer height={60} />
              <div className='bg-gradient-to-r from-black to-white'
                style={{
                  // backgroundColor: 'rgba(220, 126, 82, 0.1)',
                  marginTop: 'auto',
                  minHeight: 250,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  padding: 24,
                  paddingTop: 42,
                  gap: 24,
                }}
              >

                <h3 style={{ color: 'black', fontSize: 'clamp(1rem, 1rem + 1vw, 2rem)' }}>
                  This application is reminiscent of the once popular mobile game &quot;TapTap&quot;
                </h3>
              </div>
            </div>
            <div className="w-14 bg-gradient-to-b from-white to-black text-white px-4 py-2">
              {/* Right app bar content */}
            </div>
          </div>
          <div className="h-14 bg-gradient-to-r from-white to-black text-white px-4 py-2"></div>
        </div>
      {/* </div> */}
    </>
  );
}

function Button({
  children,
  style,
  className,
}: {
  children?: React.ReactChild;
  style?: React.CSSProperties;
  className?: string;
}) {
  return (
    <button
      className={className}
      style={{
        transition: 'background-color 150ms',
        cursor: 'pointer',
        fontSize: 'clamp(0.875rem, 0.875rem + 0.5vw, 1.2rem)',
        padding: '10px 16px',
        borderRadius: 15,
        fontWeight: 700,
        minWidth: 'max-content',
        width: '100%',
        ...style,
      }}
    >
      {children}
    </button>
  );
}
