import type {OptionsSource} from '@stackworx/react-hook-form-mui';
import {useEffect, useState} from 'react';

export interface Location {
  id: string;
  name: string;
  region: string;
}

const regions = ['Gauteng', 'Western Cape', 'KwaZulu-Natal', 'Eastern Cape'];
const sites = [
  'Head Office',
  'Warehouse',
  'Depot',
  'Distribution Centre',
  'Workshop',
  'Store',
  'Yard',
  'Call Centre',
  'Training Centre',
  'Pop-up',
];

export const locations: Location[] = regions.flatMap((region, r) =>
  sites.map((site, s) => ({
    id: `L${String(r * sites.length + s + 1)}`,
    name: `${site} ${region}`,
    region,
  }))
);

const pageSize = 8;

function matching(search: string) {
  const term = search.toLowerCase();
  return locations.filter((location) =>
    location.name.toLowerCase().includes(term)
  );
}

/**
 * An in-memory stand-in for a Relay pagination fragment: filters by name,
 * pages by `pageSize` and answers after a short delay.
 */
export function useLocationSource(): OptionsSource<Location> {
  const [search, setSearch] = useState('');
  const [pages, setPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [options, setOptions] = useState<Location[]>(() =>
    locations.slice(0, pageSize)
  );
  const matches = matching(search);

  useEffect(() => {
    const timer = setTimeout(() => {
      setOptions(matching(search).slice(0, pages * pageSize));
      setLoading(false);
      setLoadingMore(false);
    }, 300);
    return () => {
      clearTimeout(timer);
    };
  }, [search, pages]);

  return {
    options,
    loading,
    loadingMore,
    hasMore: options.length < matches.length,
    totalCount: matches.length,
    onSearch: (next) => {
      setLoading(true);
      setPages(1);
      setSearch(next);
    },
    onLoadMore: () => {
      setLoadingMore(true);
      setPages((count) => count + 1);
    },
  };
}
