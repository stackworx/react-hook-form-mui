/**
 * Server-backed options for `AsyncAutocomplete`. The app builds it, for example
 * from Relay's `usePaginationFragment`; the library never fetches.
 */
export interface OptionsSource<TOption> {
  /** The options loaded so far for the current search. */
  options: readonly TOption[];
  /** True while a search refetch is in flight (e.g. `isPending` of the transition around `refetch`). */
  loading: boolean;
  /**
   * Called (debounced) when the user types or clears the input, and with `''`
   * when the popup reopens after the input was reset by a pick or a blur.
   */
  onSearch: (search: string) => void;
  /** More options are available for the current search. */
  hasMore: boolean;
  /** True while the next page is loading. */
  loadingMore?: boolean;
  /** Loads the next page. */
  onLoadMore: () => void;
  /** Total matches for the current search, when known. */
  totalCount?: number;
}
