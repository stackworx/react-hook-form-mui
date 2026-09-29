import type {AutocompleteValue} from '@mui/material/Autocomplete';
import {useState} from 'react';

/** What an autocomplete hands to MUI: an option, `null`, or an array of options when `multiple`. */
export type Selection<TOption> = AutocompleteValue<
  TOption,
  boolean | undefined,
  boolean | undefined,
  false
>;

/** A string or number option is its own key. */
export function defaultOptionKey(option: unknown): unknown {
  return option;
}

/**
 * MUI's default label, `option.label ?? option`, as a string: MUI's own logs an error for a number.
 */
export function defaultOptionLabel(option: unknown): string {
  if (typeof option === 'object' && option !== null && 'label' in option) {
    return String(option.label);
  }
  return String(option);
}

/** How an autocomplete maps between its options and what the form stores. */
export interface OptionMapping<TOption, TValue> {
  /** What the form stores for an option. */
  toValue: (option: TOption) => TValue;
  /** The key options are looked up by: the option's key, or its value when the form stores values. */
  lookupKey: (option: TOption) => unknown;
  /** The option to show for a stored value, from options indexed by `lookupKey`. */
  resolve: (
    stored: unknown,
    candidates: ReadonlyMap<unknown, TOption>,
  ) => TOption | undefined;
}

/**
 * Stores options themselves unless `getOptionValue` is given. Stored options are matched by key, not by
 * reference: React Hook Form clones default values, and a refetch returns new objects.
 */
export function optionMapping<TOption, TValue>(
  getOptionKey: (option: TOption) => unknown,
  getOptionValue: ((option: TOption) => TValue) | undefined,
): OptionMapping<TOption, TValue> {
  if (getOptionValue) {
    return {
      toValue: getOptionValue,
      lookupKey: getOptionValue,
      resolve: (stored, candidates) => candidates.get(stored),
    };
  }
  return {
    toValue: (option) => option as unknown as TValue,
    lookupKey: getOptionKey,
    // A stored option still shows when the options no longer include it: it carries its own label.
    // An empty string is no selection, as it is for MUI.
    resolve: (stored, candidates) =>
      stored === null || stored === undefined
        ? undefined
        : (candidates.get(getOptionKey(stored as TOption))
          ?? (stored === '' ? undefined : stored as TOption)),
  };
}

export function indexOptions<TOption>(
  options: Iterable<TOption>,
  lookupKey: (option: TOption) => unknown,
): Map<unknown, TOption> {
  const index = new Map<unknown, TOption>();
  for (const option of options) index.set(lookupKey(option), option);
  return index;
}

/** The stored value(s) as a list. */
export function storedValues(value: unknown, multiple: boolean): unknown[] {
  if (multiple) return Array.isArray(value) ? value : [];
  return value === null || value === undefined ? [] : [value];
}

/** Resolves stored values to options; values without an option are left out. */
export function optionsForValues<TOption>(
  value: unknown,
  multiple: boolean,
  resolve: (stored: unknown) => TOption | undefined,
): Selection<TOption> {
  const options = storedValues(value, multiple).flatMap((stored) => {
    const option = resolve(stored);
    return option === undefined ? [] : [option];
  });
  return multiple ? options : (options[0] ?? null);
}

/** Maps what MUI reports back to the stored value(s). */
export function valuesForOptions<TOption, TValue>(
  next: Selection<TOption>,
  toValue: (option: TOption) => TValue,
): TValue[] | TValue | null {
  if (Array.isArray(next)) return next.map(toValue);
  return next === null ? null : toValue(next);
}

export function asList<TOption>(selection: Selection<TOption>): TOption[] {
  if (Array.isArray(selection)) return selection;
  return selection === null ? [] : [selection];
}

/**
 * Keeps the previous selection object while it shows the same keys and labels.
 * MUI resets the typed input text whenever `value` changes identity, so a fresh
 * array (or fresh option objects after a refetch) would wipe the user's search.
 */
export function useStableSelection<TOption>(
  next: Selection<TOption>,
  getOptionKey: (option: TOption) => unknown,
  getOptionLabel: (option: TOption) => string,
): Selection<TOption> {
  const [stable, setStable] = useState(next);
  const previous = asList(stable);
  const current = asList(next);
  const same = Array.isArray(stable) === Array.isArray(next)
    && previous.length === current.length
    && previous.every((option, index) => {
      const other = current[index];
      return other !== undefined
        && getOptionKey(option) === getOptionKey(other)
        && getOptionLabel(option) === getOptionLabel(other);
    });
  if (same) return stable;
  setStable(next);
  return next;
}
