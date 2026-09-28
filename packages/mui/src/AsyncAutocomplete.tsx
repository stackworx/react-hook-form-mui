import AutocompleteBase from '@mui/material/Autocomplete';
import type {
  AutocompleteProps as MuiAutocompleteProps,
  AutocompleteValue,
} from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import TextFieldBase from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import {useEffect, useRef, useState} from 'react';
import type {ReactNode} from 'react';
import type {FieldPath, FieldValues} from 'react-hook-form';
import {ListboxWithFooter} from './asyncAutocomplete/ListboxWithFooter.js';
import type {ListboxWithFooterProps} from './asyncAutocomplete/ListboxWithFooter.js';
import type {OptionsSource} from './asyncAutocomplete/OptionsSource.js';
import type {
  AutocompleteStoredValue,
  OptionValueProps,
} from './Autocomplete.js';
import {composeHandlers} from './internal/composeHandlers.js';
import {forceSlotProps} from './internal/forceSlotProps.js';
import {
  asList,
  indexOptions,
  optionMapping,
  optionsForValues,
  storedValues,
  useStableSelection,
  valuesForOptions,
} from './internal/optionSelection.js';
import {
  splitControllerProps,
  useFieldController,
} from './internal/useFieldController.js';
import type {FieldControllerProps} from './internal/useFieldController.js';

type MuiProps<TOption, TMultiple extends boolean | undefined> =
  MuiAutocompleteProps<TOption, TMultiple, boolean | undefined, false>;

export type AsyncAutocompleteProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
  TOption,
  TMultiple extends boolean | undefined = false,
  TTransformedValues = TFieldValues,
> =
  & FieldControllerProps<TFieldValues, TName, TTransformedValues>
  & {
    source: OptionsSource<TOption>;
    /** Identifies an option. A stored option is matched by it, not by reference. */
    getOptionKey: (option: TOption) => string;
    getOptionLabel: (option: TOption) => string;
    multiple?: TMultiple;
    label: ReactNode;
    helperText?: ReactNode;
    placeholder?: string;
    /** Delay before typed text reaches `source.onSearch`. @default 250 */
    debounceMs?: number;
    /** Options for stored values that may be missing from `source.options` (e.g. resolved with `nodes(ids:)`). */
    knownOptions?: readonly TOption[];
    /** @default 'Load more' */
    loadMoreText?: ReactNode;
    /** @default (loaded, total) => `Showing ${loaded} of ${total} — type to narrow` */
    countText?: (loaded: number, total: number) => ReactNode;
  }
  & OptionValueProps<
    TOption,
    AutocompleteStoredValue<TFieldValues, TName, TMultiple>
  >
  & Omit<
    MuiProps<TOption, TMultiple>,
    | 'options'
    | 'value'
    | 'defaultValue'
    | 'onChange'
    | 'renderInput'
    | 'multiple'
    | 'getOptionLabel'
    | 'getOptionKey'
    | 'isOptionEqualToValue'
    | 'disabled'
    | 'loading'
    | 'filterOptions'
  >;

const defaultCountText = (loaded: number, total: number) =>
  `Showing ${String(loaded)} of ${String(total)} — type to narrow`;

/**
 * An Autocomplete over server-backed options (an `OptionsSource` the app builds). The form stores the
 * selected option, or `getOptionValue`'s result for it. Selected options keep their labels when later
 * pages or searches no longer contain them.
 */
export function AsyncAutocomplete<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
  TOption,
  TMultiple extends boolean | undefined = false,
  TTransformedValues = TFieldValues,
>(
  props: AsyncAutocompleteProps<
    TFieldValues,
    TName,
    TOption,
    TMultiple,
    TTransformedValues
  >,
) {
  const [
    controllerProps,
    {
      source,
      getOptionKey,
      getOptionLabel,
      getOptionValue,
      multiple,
      label,
      helperText,
      placeholder,
      debounceMs = 250,
      knownOptions = [],
      loadMoreText = 'Load more',
      countText = defaultCountText,
      onBlur,
      onInputChange,
      onOpen,
      slotProps,
      ...rest
    },
  ] = splitControllerProps<
    TFieldValues,
    TName,
    AsyncAutocompleteProps<
      TFieldValues,
      TName,
      TOption,
      TMultiple,
      TTransformedValues
    >,
    TTransformedValues
  >(props);
  const {field, errorText, hasError} = useFieldController(controllerProps);

  const mapping = optionMapping(getOptionKey, getOptionValue);
  // Selected options, so their labels survive pages and searches that no longer include them.
  const [picked, setPicked] = useState<ReadonlyMap<unknown, TOption>>(
    () => new Map(),
  );
  const remember = (options: readonly TOption[]) => {
    setPicked((previous) => {
      const next = new Map(previous);
      for (const option of options) next.set(mapping.lookupKey(option), option);
      return next;
    });
  };
  const available = indexOptions(
    [...source.options, ...knownOptions],
    mapping.lookupKey,
  );
  const unremembered = storedValues(field.value, Boolean(multiple)).flatMap(
    (stored) => {
      const option = mapping.resolve(stored, available);
      return option === undefined || picked.has(mapping.lookupKey(option))
        ? []
        : [option];
    },
  );
  if (unremembered.length > 0) remember(unremembered);

  const value = useStableSelection(
    optionsForValues(
      field.value,
      Boolean(multiple),
      (stored) =>
        mapping.resolve(stored, available) ?? mapping.resolve(stored, picked),
    ),
    getOptionKey,
    getOptionLabel,
  );
  const sourceKeys = new Set(source.options.map(getOptionKey));
  const options = [
    ...source.options,
    ...asList(value).filter((option) => !sourceKeys.has(getOptionKey(option))),
  ];

  // What the source was last asked for; drives the footer text.
  const [search, setSearch] = useState('');
  const lastSearchRef = useRef('');
  const inputWasResetRef = useRef(false);
  const timerRef = useRef<ReturnType<typeof setTimeout>>(undefined);
  useEffect(
    () => () => {
      clearTimeout(timerRef.current);
    },
    [],
  );
  const sendSearch = (term: string) => {
    clearTimeout(timerRef.current);
    lastSearchRef.current = term;
    source.onSearch(term);
  };

  const loaded = source.options.length;
  const total = source.totalCount;
  const showCount = search === '' && total !== undefined && total > loaded;
  const footer = source.hasMore || showCount
    ? (
      <Box
        // Keeps focus in the input so the popup stays open.
        onMouseDown={(event) => {
          event.preventDefault();
        }}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 1,
          px: 2,
          py: 1,
          borderTop: 1,
          borderColor: 'divider',
        }}
      >
        {showCount
          ? (
            <Typography variant='caption' color='text.secondary'>
              {countText(loaded, total)}
            </Typography>
          )
          : <span />}
        {source.hasMore
          ? (
            <Button
              size='small'
              loading={source.loadingMore}
              onClick={() => {
                source.onLoadMore();
              }}
            >
              {loadMoreText}
            </Button>
          )
          : null}
      </Box>
    )
    : null;
  const listboxProps:
    & Pick<
      ListboxWithFooterProps,
      'onReachEnd' | 'footer'
    >
    & {component: typeof ListboxWithFooter} = {
      component: ListboxWithFooter,
      onReachEnd: () => {
        if (source.hasMore && !source.loadingMore) source.onLoadMore();
      },
      footer,
    };
  // The object form of MUI's listbox slot props; the extra props are for ListboxWithFooter.
  type ListboxSlotProps = Exclude<
    NonNullable<
      NonNullable<MuiProps<TOption, TMultiple>['slotProps']>['listbox']
    >,
    (...args: never[]) => unknown
  >;

  return (
    <AutocompleteBase
      {...rest}
      multiple={multiple}
      options={options}
      value={value as AutocompleteValue<
        TOption,
        TMultiple,
        boolean | undefined,
        false
      >}
      onChange={(_event, next) => {
        remember(asList<TOption>(next));
        field.onChange(valuesForOptions(next, mapping.toValue));
      }}
      onBlur={composeHandlers<Parameters<NonNullable<typeof onBlur>>>(
        field.onBlur,
        onBlur,
      )}
      onInputChange={(event, inputValue, reason) => {
        onInputChange?.(event, inputValue, reason);
        if (reason !== 'input' && reason !== 'clear') {
          inputWasResetRef.current = true;
          return;
        }
        inputWasResetRef.current = false;
        setSearch(inputValue);
        if (reason === 'clear' || debounceMs <= 0) {
          sendSearch(inputValue);
        } else {
          clearTimeout(timerRef.current);
          timerRef.current = setTimeout(() => {
            sendSearch(inputValue);
          }, debounceMs);
        }
      }}
      onOpen={(event) => {
        onOpen?.(event);
        if (inputWasResetRef.current && lastSearchRef.current !== '') {
          setSearch('');
          sendSearch('');
        }
      }}
      filterOptions={(unfiltered) => unfiltered}
      getOptionLabel={getOptionLabel}
      getOptionKey={getOptionKey}
      isOptionEqualToValue={(option, selected) =>
        getOptionKey(option) === getOptionKey(selected)}
      loading={source.loading}
      disabled={field.disabled}
      slotProps={{
        ...slotProps,
        listbox: forceSlotProps(
          slotProps?.listbox,
          () => listboxProps as unknown as Partial<ListboxSlotProps>,
        ),
      }}
      renderInput={(params) => {
        const {endAdornment, ...inputSlotProps} = params.slotProps.input;
        return (
          <TextFieldBase
            {...params}
            name={field.name}
            label={label}
            placeholder={placeholder}
            inputRef={field.ref}
            error={hasError}
            helperText={errorText ?? helperText}
            slotProps={{
              ...params.slotProps,
              input: {
                ...inputSlotProps,
                endAdornment: (
                  <>
                    {source.loading
                      ? <CircularProgress color='inherit' size={18} />
                      : null}
                    {endAdornment}
                  </>
                ),
              },
            }}
          />
        );
      }}
    />
  );
}
