import AutocompleteBase from '@mui/material/Autocomplete';
import type {
  AutocompleteProps as MuiAutocompleteProps,
  AutocompleteValue,
} from '@mui/material/Autocomplete';
import TextFieldBase from '@mui/material/TextField';
import type {ReactNode} from 'react';
import type {FieldPath, FieldValues, PathValue} from 'react-hook-form';
import {composeHandlers} from './internal/composeHandlers.js';
import {changeHandler} from './internal/fieldHandlers.js';
import type {FieldHandlerProps} from './internal/fieldHandlers.js';
import {
  asList,
  defaultOptionKey,
  defaultOptionLabel,
  indexOptions,
  inputTextFor,
  optionMapping,
  optionsForValues,
  useSelectionText,
  useStableSelection,
  valuesForOptions,
} from './internal/optionSelection.js';
import {
  splitControllerProps,
  useFieldController,
} from './internal/useFieldController.js';
import type {FieldControllerProps} from './internal/useFieldController.js';
import {useHelperText} from './internal/HelperText.js';
import type {ReserveHelperTextProps} from './internal/HelperText.js';

/**
 * What an autocomplete stores: the selected option, or what `getOptionValue` returns for it; an array of
 * them when `multiple`.
 */
export type AutocompleteFieldValue<
  TValue,
  TMultiple extends boolean | undefined,
> = AutocompleteValue<TValue, TMultiple, false, false>;

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

type MuiOptionProps<TOption> = MuiAutocompleteProps<
  TOption,
  boolean | undefined,
  boolean | undefined,
  false
>;

// MUI's conventions: a string or number option is its own key and label, and an object's label is its
// `label`. Options that follow them need neither prop.
export type OptionKeyProps<TOption> = [TOption] extends [string | number] ? {
    /** Identifies an option. Defaults to the option itself. */
    getOptionKey?: MuiOptionProps<TOption>['getOptionKey'];
  }
  : {
    /** Identifies an option. A stored option is matched by it, not by reference. */
    getOptionKey: NonNullable<MuiOptionProps<TOption>['getOptionKey']>;
  };

export type OptionLabelProps<TOption> = [TOption] extends
  [string | number | {label: string}] ? {
    /** The option's text. Defaults to its `label`, or the option itself. */
    getOptionLabel?: MuiOptionProps<TOption>['getOptionLabel'];
  }
  : {
    /** The option's text. */
    getOptionLabel: NonNullable<MuiOptionProps<TOption>['getOptionLabel']>;
  };

/** MUI's `onChange` arguments, which `handleChange` takes. */
export type AutocompleteChangeArgs<
  TOption,
  TMultiple extends boolean | undefined,
> = Parameters<
  NonNullable<
    MuiAutocompleteProps<TOption, TMultiple, boolean | undefined, false>[
      'onChange'
    ]
  >
>;

/** `handleChange` takes MUI's `onChange` arguments, and `handleBlur` its `onBlur` ones. */
export type AutocompleteHandlerProps<
  TOption,
  TMultiple extends boolean | undefined,
> = FieldHandlerProps<
  AutocompleteChangeArgs<TOption, TMultiple>,
  Parameters<NonNullable<MuiOptionProps<TOption>['onBlur']>>
>;

export type AutocompleteProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
  TOption,
  TMultiple extends boolean | undefined = false,
  TTransformedValues = TFieldValues,
> =
  & FieldControllerProps<TFieldValues, TName, TTransformedValues>
  & ReserveHelperTextProps
  & {
    options: readonly TOption[];
    multiple?: TMultiple;
    label: ReactNode;
    helperText?: ReactNode;
    placeholder?: string;
  }
  & OptionKeyProps<TOption>
  & OptionLabelProps<TOption>
  & OptionValueProps<
    TOption,
    AutocompleteStoredValue<TFieldValues, TName, TMultiple>
  >
  & AutocompleteHandlerProps<TOption, TMultiple>
  & Omit<
    MuiAutocompleteProps<TOption, TMultiple, boolean | undefined, false>,
    | 'options'
    | 'value'
    | 'defaultValue'
    | 'onChange'
    | 'onBlur'
    | 'renderInput'
    | 'multiple'
    | 'getOptionLabel'
    | 'getOptionKey'
    | 'isOptionEqualToValue'
    | 'disabled'
  >;

/**
 * An Autocomplete over a static list. The form stores the selected option, or `getOptionValue`'s result
 * for it. Options can be strings, numbers or objects, as in MUI. A stored value without a matching option
 * is dropped on the next change; a stored option still shows until then.
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
      getOptionLabel = defaultOptionLabel,
      getOptionValue,
      multiple,
      label,
      helperText,
      reserveHelperText,
      placeholder,
      handleChange,
      handleBlur,
      suppressFormChange,
      inputValue: inputValueProp,
      onInputChange,
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
  const {helper} = useHelperText(errorText, helperText, reserveHelperText);
  const keyOf = getOptionKey ?? defaultOptionKey;
  const mapping = optionMapping(keyOf, getOptionValue);
  const byLookupKey = indexOptions(options, mapping.lookupKey);
  const value = useStableSelection(
    optionsForValues(
      field.value,
      Boolean(multiple),
      (stored) => mapping.resolve(stored, byLookupKey),
    ),
    keyOf,
    getOptionLabel,
  );
  const {inputText, setInputText, resyncText} = useSelectionText(
    inputTextFor(value, getOptionLabel, rest.renderValue !== undefined),
  );
  const change = changeHandler<AutocompleteChangeArgs<TOption, TMultiple>>((
    _event,
    next,
  ) => {
    field.onChange(valuesForOptions(next, mapping.toValue));
  }, {handleChange, suppressFormChange});
  // MUI warns about a value that none of its options match.
  const keys = new Set(options.map(keyOf));
  const shownOptions = [
    ...options,
    ...asList(value).filter((option) => !keys.has(keyOf(option))),
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
      inputValue={inputValueProp ?? inputText}
      onInputChange={(event, text, reason) => {
        setInputText(text);
        onInputChange?.(event, text, reason);
      }}
      onChange={(event, next, reason, details) => {
        if (suppressFormChange) resyncText();
        change(event, next, reason, details);
      }}
      onBlur={composeHandlers<
        Parameters<NonNullable<MuiOptionProps<TOption>['onBlur']>>
      >(field.onBlur, handleBlur)}
      getOptionLabel={getOptionLabel}
      getOptionKey={getOptionKey}
      isOptionEqualToValue={(option, selected) =>
        keyOf(option) === keyOf(selected)}
      disabled={field.disabled}
      renderInput={(params) => (
        <TextFieldBase
          {...params}
          name={field.name}
          label={label}
          placeholder={placeholder}
          inputRef={field.ref}
          error={hasError}
          helperText={helper}
        />
      )}
    />
  );
}
