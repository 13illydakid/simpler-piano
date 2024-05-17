import React, { PropsWithChildren } from 'react';
import { AppBar, Sizer } from '@/components';
import Link from 'next/link';
import { Article, CaptionedImage } from './components';
import { slugify } from './utils';
import Head from 'next/head';

function SidebarLink({ children }: PropsWithChildren<{ children: string }>) {
  return (
    <a className="hover:text-black" href={`#${slugify(children)}`}>
      {children}
    </a>
  );
}

export default function AboutPage() {
  return (
    <>
      <Head>
        <title>Simple Piano</title>
      </Head>
      <div className="relative">
        <AppBar />
        <div className="md:bg-green-500t">
          <div className="flex max-w-screen-lg mx-auto">
            <div className="hidden md:block sticky top-0 p-8 max-h-screen">
              <section className="flex flex-col mx-auto">
                <h2 className="text-3xl">About</h2>
                <Sizer height={32} />
                <ul className="text-xl flex flex-col gap-5 whitespace-nowrap">
                  <li>
                    <SidebarLink>Intro</SidebarLink>
                  </li>
                  <li>
                    <SidebarLink>Steps</SidebarLink>
                  </li>
                  <li>
                    <SidebarLink>Library</SidebarLink>
                  </li>
                  <li>
                    <SidebarLink>Browsers compatible</SidebarLink>
                  </li>
                  <li>
                    <SidebarLink>Guide</SidebarLink>
                  </li>
                  <li>
                    <SidebarLink>Feedback</SidebarLink>
                  </li>
                </ul>
              </section>
            </div>
            <div className="my-8 p-8 mx-auto w-full text-base flex-1 bg-white">
              <div className="max-w-prose flex flex-col gap-12 mx-auto">
                <WhatSection />
                <GettingStarted />
                <MusicSelectionSection />
                <BrowserCompatibilitySection />
                <RoadmapSection />
                <FeedbackSection />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function WhatSection() {
  return (
    <Article
      header="What"
      first="Simple Piano is my personal alternative to the application 'Simply Piano' for learning piano."
    >
      <p>
        This application drew some inspiration from one of my favorite classic ipod touch apps
        &apos;Tap Tap&apos;.<span className="italic">Visualize notes</span> song visualization.
      </p>
      <Sizer height={8} />
      <CaptionedImage
        src="/images/mode_falling_notes_screenshot.png"
        caption="Falling Notes with note labels"
        height={1628}
        width={1636}
      />
      <Sizer height={24} />
      <p></p>
      <Sizer height={8} />
      <CaptionedImage
        src="/images/mode_sheet_hero_screenshot.png"
        width={1980}
        height={1148}
        caption="Sheet Hero (beta) with note labels"
      />
    </Article>
  );
}

function GettingStarted() {
  return (
    <Article header="Getting started" first="Plug in a keyboard. Start slow. Gradually speed up.">
      <p></p>
    </Article>
  );
}

function MusicSelectionSection() {
  return (
    <Article
      header="Music selection"
      first="The r Piano catalog has two components: builtin, and local file uploads."
    >
      <p>
        Contact me:&nbsp;
        <AboutLink href="mailto:billychiu517@gmail.com">Email</AboutLink>
      </p>
    </Article>
  );
}

function BrowserCompatibilitySection() {
  return (
    <Article
      header="Browser compatibility"
      first="Simpler Piano is fully compatible with the latest versions of Chrome."
    >
      <p></p>
    </Article>
  );
}

function RoadmapSection() {
  return (
    <Article header="Roadmap">
      <p></p>
    </Article>
  );
}

function FeedbackSection() {
  return (
    <Article header="Feedback">
      <p></p>
    </Article>
  );
}

function AboutLink({ href, children }: PropsWithChildren<{ href: string }>) {
  return (
    <Link href={href} className="text-blue-500 hover:text-green-400">
      {children}
    </Link>
  );
}
