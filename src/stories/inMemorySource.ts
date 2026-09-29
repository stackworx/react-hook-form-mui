import type {OptionsSource} from '@stackworx/react-hook-form-mui';
import {useEffect, useEffectEvent, useState} from 'react';

/**
 * An in-memory stand-in for a Relay pagination fragment: filters by `text`, pages by `pageSize` and
 * answers after `latencyMs`.
 */
export function useInMemorySource<T>(
  items: readonly T[],
  text: (item: T) => string,
  pageSize = 8,
  latencyMs = 300,
): OptionsSource<T> {
  const [search, setSearch] = useState('');
  const [pages, setPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [options, setOptions] = useState<readonly T[]>(() =>
    items.slice(0, pageSize)
  );
  const matching = (term: string) =>
    items.filter((item) =>
      text(item).toLowerCase().includes(term.toLowerCase())
    );
  const matches = matching(search);
  const settle = useEffectEvent(() => {
    setOptions(matches.slice(0, pages * pageSize));
    setLoading(false);
    setLoadingMore(false);
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      settle();
    }, latencyMs);
    return () => {
      clearTimeout(timer);
    };
  }, [search, pages, latencyMs]);

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
