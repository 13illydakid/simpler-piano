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

export { default } from './AboutPage';
