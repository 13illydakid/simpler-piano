import { PropsWithChildren } from 'react';
import { Sizer } from '@/components';
import { Logo, GitHub, Menu } from '@/icons';
import Link from 'next/link';
import clsx from 'clsx';
import { useRouter } from 'next/router';
import { Dropdown } from './Dropdown';
import { GithubIcon } from '@/icons';

type NavItem = { route: string; label: string };
const navItems: NavItem[] = [
  { route: '/songs', label: '🎵 Library' },
  { route: '/freeplay', label: '🎹 Piano' },
  // TODO: launch phrases.
  // { route: '/training/phrases', label: 'Training' },
  // { route: '/about', label: 'About' },
];

export default function AppBar() {
  return (
    <div
      className="h-[50px] min-h-[50px] bg-gradient-to-r from-black to-white flex flex-col justify-center fixed"
      style={{
        // This is a hack that accounts for the sometimes present scrollbar.
        // The 100vw includes scrollbar and the 100% does not, so we padLeft the difference.
        // Credit goes to: https://aykevl.nl/2014/09/fix-jumping-scrollbar
        paddingLeft: 'calc(100vw - 100%)',
        width: '100%',
        transition: '0.32s ease-in-out',
      }}
    >
      <div className="flex items-center pl-6 justify-center mx-auto w-full md:max-w-screen-lg">
        <div
          className="absolute top-1/2 -translate-y-1/2 md:hidden left-5 right-5 z-10"
          style={{ transform: 'translateY(-50%)' }}
        >
          <SmallWindowNav />
        </div>
        <NavLink
          href={'/'}
          className="flex items-baseline text-white hover:text-black hover:opacity-70"
        >
          <Logo height={24} width={24} className="relative top-[3px]" />
          <Sizer width={8} />
          <span className="font-extralight text-2xl relative top-[-10px]">Simpler Piano</span>
        </NavLink>
        <div className="hidden md:flex align-baseline gap-6 flex-grow justify-evenly whitespace-nowrap pl-16">
          {navItems.map((nav) => {
            return (
              <NavLink
                className="text-white hover:text-black hover:opacity-70"
                href={nav.route}
                key={nav.label}
                label={nav.label}
              />
            );
          })}
          <NavLink
            href={'https://github.com/13illydakid/simpler-piano'}
            target="_blank" rel="noopener noreferrer"
            className="rounded-full pr-8 lgminus:pr-0 ml-auto flex gap-2 items-center text-white hover:bg-black hover:opacity-90"
          >
            <GithubIcon size={16} className="relative t-[2px]" />
            {/* <GitHub size={16} className="relative t-[2px]" /> */}
            {/* GitHub */}
          </NavLink>
        </div>
      </div>
    </div>
  );
}

function SmallWindowNav() {
  return (
    <Dropdown target={<Menu height={24} width={24} className="block text-white" />}>
      <div className="flex flex-col bg-white">
        {navItems.map((nav, i) => {
          return (
            <div className="flex flex-col py-3 gap-4 items-enter px-3" key={i}>
              <NavLink
                href={nav.route}
                className={clsx(
                  'text-black text-2xl px-6 transition hover:text-opacity-75 inline-block cursor-pointer w-fit',
                )}
                label={nav.label}
              />
            </div>
          );
        })}
      </div>
    </Dropdown>
  );
}

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
