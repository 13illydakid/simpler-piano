import { Sizer } from '@/components';
import { PropsWithChildren } from 'react';
import { slugify } from '../utils';

export function Article({
  children,
  header,
  first,
}: PropsWithChildren<{ header: string; first?: string | null }>) {
  return (
    <article id={slugify(header)}>
      <h1 className="text-3xl font-bold">{header}</h1>
      <Sizer height={8} />
      <div aria-hidden className="border-green-500 border" />
      <Sizer height={16} />
      {first && (
        <>
          <h2 className="font-medium text-lg">{first}</h2>
          <Sizer height={16} />
        </>
      )}
      <div className="flex flex-col gap-3">{children}</div>
    </article>
  );
};
