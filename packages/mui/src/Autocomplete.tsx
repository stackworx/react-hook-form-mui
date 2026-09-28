import AutocompleteBase from '@mui/material/Autocomplete';
import type {
  AutocompleteProps as MuiAutocompleteProps,
  AutocompleteValue,
} from '@mui/material/Autocomplete';
import TextFieldBase from '@mui/material/TextField';
import type {ReactNode} from 'react';
import type {FieldPath, FieldValues, PathValue} from 'react-hook-form';
import {composeHandlers} from './internal/composeHandlers.js';
import {
  asList,
  indexOptions,
  optionMapping,
  optionsForValues,
  useStableSelection,
  valuesForOptions,
} from './internal/optionSelection.js';
import {
  splitControllerProps,
  useFieldController,
} from './internal/useFieldController.js';
import type {FieldControllerProps} from './internal/useFieldController.js';

/**
 * What an autocomplete stores: the selected option, or what `getOptionValue` returns for it; an array of
 * them when `multiple`.
 */
export type AutocompleteFieldValue<
  TValue,
  TMultiple extends boolean | undefined,
> = TMultiple extends true ? TValue[] : TValue | null;

/**
 * What one selection stores in the field `TName`: the field's type, or its element type when `multiple`.
 * `never` when the field can't hold a selection: a single one must accept `null`, a multiple one is an array.
 */
export type AutocompleteStoredValue<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
  TMultiple extends boolean | undefined,
> = TMultiple extends true
  ? Exclude<PathValue<TFieldValues, TName>, undefined> extends
    readonly (infer TItem)[] ? TItem
  : never
  : null extends PathValue<TFieldValues, TName>
    ? Exclude<PathValue<TFieldValues, TName>, null | undefined>
  : never;

// The field's type decides what is stored, so an inline `getOptionValue` is typed from it instead of
// having to be inferred.
export type OptionValueProps<TOption, TStored> = [TOption] extends [TStored] ? {
    /** What the form stores for an option, such as its id. Without it, the form stores the option. */
    getOptionValue?: (option: TOption) => TStored;
  }
  : {
    /** What the form stores for an option, such as its id. Without it, the form stores the option. */
    getOptionValue: (option: TOption) => TStored;
  };

export type AutocompleteProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
  TOption,
  TMultiple extends boolean | undefined = false,
  TTransformedValues = TFieldValues,
> =
  & FieldControllerProps<TFieldValues, TName, TTransformedValues>
  & {
    options: readonly TOption[];
    /** Identifies an option. A stored option is matched by it, not by reference. */
    getOptionKey: (option: TOption) => string;
    getOptionLabel: (option: TOption) => string;
    multiple?: TMultiple;
    label: ReactNode;
    helperText?: ReactNode;
    placeholder?: string;
  }
  & OptionValueProps<
    TOption,
    AutocompleteStoredValue<TFieldValues, TName, TMultiple>
  >
  & Omit<
    MuiAutocompleteProps<TOption, TMultiple, boolean | undefined, false>,
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
  >;

/**
 * An Autocomplete over a static list. The form stores the selected option, or `getOptionValue`'s result
 * for it. A stored value without a matching option is dropped on the next change; a stored option still
 * shows until then.
 */
export function Autocomplete<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
  TOption,
  TMultiple extends boolean | undefined = false,
  TTransformedValues = TFieldValues,
>(
  props: AutocompleteProps<
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
      options,
      getOptionKey,
      getOptionLabel,
      getOptionValue,
      multiple,
      label,
      helperText,
      placeholder,
      onBlur,
      ...rest
    },
  ] = splitControllerProps<
    TFieldValues,
    TName,
    AutocompleteProps<
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
  const byLookupKey = indexOptions(options, mapping.lookupKey);
  const value = useStableSelection(
    optionsForValues(
      field.value,
      Boolean(multiple),
      (stored) => mapping.resolve(stored, byLookupKey),
    ),
    getOptionKey,
    getOptionLabel,
  );
  // MUI warns about a value that none of its options match.
  const keys = new Set(options.map(getOptionKey));
  const shownOptions = [
    ...options,
    ...asList(value).filter((option) => !keys.has(getOptionKey(option))),
  ];

  return (
    <AutocompleteBase
      {...rest}
      multiple={multiple}
      options={shownOptions}
      value={value as AutocompleteValue<
        TOption,
        TMultiple,
        boolean | undefined,
        false
      >}
      onChange={(_event, next) => {
        field.onChange(valuesForOptions(next, mapping.toValue));
      }}
      onBlur={composeHandlers<Parameters<NonNullable<typeof onBlur>>>(
        field.onBlur,
        onBlur,
      )}
      getOptionLabel={getOptionLabel}
      getOptionKey={getOptionKey}
      isOptionEqualToValue={(option, selected) =>
        getOptionKey(option) === getOptionKey(selected)}
      disabled={field.disabled}
      renderInput={(params) => (
        <TextFieldBase
          {...params}
          name={field.name}
          label={label}
          placeholder={placeholder}
          inputRef={field.ref}
          error={hasError}
          helperText={errorText ?? helperText}
        />
      )}
    />
  );
}
