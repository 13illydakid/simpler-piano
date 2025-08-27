import { AppBar, Sizer } from '@/components';
import Link from 'next/link';
import React, { PropsWithChildren, useState } from 'react';
import { Pause, Play } from '@/icons';
import clsx from 'clsx';
import { SongPreview } from '../../SongPreview/SongPreview';
import { useEventListener, useOnUnmount, usePlayerState } from '@/hooks';
import Head from 'next/head';
import { SongSource } from '@/types';
import { useRouter } from 'next/router';

export const FEATURED_SONGS: { [id: string]: { source: SongSource; id: string } } = {
  counting: { source: 'builtin', id: 'fa7a5d0bf5012a4cb4a19f1de2e58b10' },
  sindria: { source: 'builtin', id: 'b50ee876b785c66a70dba3159d21e81e' },
  lullaby: { source: 'builtin', id: 'bb4edb91d3a12b8c745e59b8435f74c2' },
};

function NavLink(
  props: PropsWithChildren<{ href: string; target?: string; rel?: string; className?: string; style?: any; label?: string }>,
) {
  const currentRoute = useRouter().route;
  return (
    <Link
      {...props}
      className={clsx(
        props.className,
        'transition',
        currentRoute === props.href && 'font-bold',
        props.label &&
          'after:block after:font-bold after:overflow-hidden after:invisible after:text-transparent after:h-0 after:content-[attr(label)]',
      )}
      data-label={props.label}
    >
      {props.label ?? props.children}
    </Link>
  );
}

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
      <div className="relative min-h-screen w-full bg-gradient-to-br from-black via-[#1a1a2e] to-[#0f3460] text-white flex flex-col">
        <AppBar />
        {/* Hero Section */}
        <section className="flex flex-col items-center justify-center py-24 px-4 text-center relative z-10">
          <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl shadow-2xl p-10 max-w-2xl mx-auto animate-fade-in">
            <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-[#ff512f] via-[#dd2476] to-[#1fa2ff] drop-shadow-lg mb-4">
              Simpler Piano
            </h1>
            <p className="text-xl md:text-2xl font-medium text-white/80 mb-6">
              Unleash your inner pianist.
              <br />
              Plug in your MIDI keyboard and play like a pro.
            </p>
            <div className="flex gap-4 justify-center">
              <NavLink href={'/songs'}>
                <Button className="bg-gradient-to-r from-[#ff512f] to-[#dd2476] text-white shadow-lg hover:scale-105 hover:shadow-pink-500/40 transition-all duration-200">
                  Get Started
                </Button>
              </NavLink>
              <NavLink href={'/freeplay'}>
              <Button className="bg-gradient-to-r from-[#1fa2ff] to-[#12d8fa] text-white shadow-lg hover:scale-105 hover:shadow-blue-500/40 transition-all duration-200">
                Free Play
              </Button>
              </NavLink>
            </div>
          </div>
        </section>
        {/* Featured Song Preview Card */}
        <section className="flex flex-col items-center justify-center flex-1">
          <div
            className={clsx(
              'relative w-full max-w-[950px] h-[500px] self-center mt-[-60px] animate-card-pop',
              'overflow-hidden rounded-2xl bg-gradient-to-br from-[#232526] to-[#414345] shadow-2xl border border-white/10',
            )}
            style={{ minWidth: 'min(100vw - 40px, 400px)' }}
          >
            <SongPreview songId={songId} source={source} />
            <div className="absolute top-0 w-full h-[60px] bg-black/80 flex items-center justify-center rounded-t-2xl border-b border-white/10">
              <button
                className={clsx(
                  'gap-1 items-center hover:text-[#ff512f] hover:scale-110 transition-all duration-150',
                  'flex absolute left-5 sm:static',
                  playerState.canPlay ? 'text-white' : 'text-gray-400',
                  'font-bold text-lg',
                )}
                onClick={playerActions.toggle}
              >
                {playerState.playing ? (
                  <>
                    <Pause size={24} /> Pause
                  </>
                ) : (
                  <>
                    <Play size={24} /> Play
                  </>
                )}
              </button>
              <div
                className="absolute right-5 top-1/2 -translate-y-1/2 text-white"
                style={{ transform: 'translateY(-50%)' }}
              >
                <select
                  className="px-4 py-2 bg-[#232526] text-white font-bold rounded-lg border border-white/20 focus:outline-none focus:ring-2 focus:ring-[#ff512f]"
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
        </section>
        {/* TapTap Reference Section */}
        <section className="w-full flex flex-col items-center justify-center py-16 px-4">
          <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl shadow-xl p-8 max-w-xl mx-auto">
            <h3 className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#ff512f] via-[#dd2476] to-[#1fa2ff] mb-2">
              Inspired by TapTap
            </h3>
            <p className="text-white/80 text-lg">
              This application is reminiscent of the once popular mobile game &quot;TapTap&quot;.
              Experience the thrill of rhythm and music in a whole new way.
            </p>
          </div>
        </section>
        {/* Footer */}
        <footer className="w-full py-6 flex flex-col items-center justify-center bg-gradient-to-r from-[#232526] to-[#414345] text-white/80 mt-auto">
          <div className="flex gap-4 mb-2">
            <a
              href="https://github.com/13illydakid/simpler-piano"
              target="_blank"
              rel="noopener"
              className="hover:text-[#ff512f] transition-colors"
            >
              GitHub
            </a>
            <a
              href="https://billy-chiu.com"
              target="_blank"
              rel="noopener"
              className="hover:text-[#1fa2ff] transition-colors"
            >
              Billy-Chiu
            </a>
          </div>
          <span className="text-xs">
            &copy; {new Date().getFullYear()} Simpler Piano. All rights reserved.
          </span>
        </footer>
        {/* Neon Glow and Animations */}
        <style jsx>{`
          .animate-fade-in {
            animation: fadeIn 1s ease;
          }
          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: none;
            }
          }
          .animate-card-pop {
            animation: cardPop 0.8s cubic-bezier(0.68, -0.55, 0.27, 1.55);
          }
          @keyframes cardPop {
            0% {
              opacity: 0;
              transform: scale(0.95) translateY(40px);
            }
            100% {
              opacity: 1;
              transform: scale(1) translateY(0);
            }
          }
        `}</style>
      </div>
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
