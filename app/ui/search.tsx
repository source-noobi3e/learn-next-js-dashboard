'use client';

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

let debounce: NodeJS.Timeout;

export default function Search({ placeholder }: { placeholder: string }) {
  const searchParams = useSearchParams(),
    pathname = usePathname(),
    { replace } = useRouter();

  const handleUserSearch = (searchStr: string) => {
    const params = new URLSearchParams(searchParams);

    params.set('page', '1');
    searchStr.length > 0
      ? params.set('query', searchStr)
      : params.delete('query');

    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="relative flex flex-1 flex-shrink-0">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <input
        type="search"
        onChange={(e) => {
          // Creating a Debounce
          // Clearing any existing debounce to
          clearTimeout(debounce);

          // CREATING A NEW DEBOUNCE: passing a handleUserSearch Function to a timeout which will get executed after 300 seconds when user stops typing.
          debounce = setTimeout(() => handleUserSearch(e.target.value), 300);
        }}
        className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
        placeholder={placeholder}
        defaultValue={searchParams.get('query')?.toString()}
      />
      <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
    </div>
  );
}
