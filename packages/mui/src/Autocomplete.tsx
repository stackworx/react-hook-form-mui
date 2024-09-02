import MuiAutocomplete, {
  AutocompleteProps as MuiAutocompleteProps,
} from '@mui/material/Autocomplete';
import type {ChipTypeMap} from '@mui/material/Chip';
import {
  FieldPath,
  FieldValues,
  useController,
  UseControllerProps,
} from 'react-hook-form';

export type AutocompleteProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
  Value,
  Multiple extends boolean | undefined,
  DisableClearable extends boolean | undefined,
  FreeSolo extends boolean | undefined,
  ChipComponent extends React.ElementType = ChipTypeMap['defaultComponent'],
> =
  & UseControllerProps<TFieldValues, TName>
  & Omit<
    MuiAutocompleteProps<
      Value,
      Multiple,
      DisableClearable,
      FreeSolo,
      ChipComponent
    >,
    'name' | 'value' | 'defaultValue'
  >;

export function Autocomplete<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
  Value = unknown,
  Multiple extends boolean | undefined = false,
  DisableClearable extends boolean | undefined = false,
  FreeSolo extends boolean | undefined = false,
  ChipComponent extends React.ElementType = ChipTypeMap['defaultComponent'],
>({
  name,
  control,
  rules,
  onChange,
  ...props
}: AutocompleteProps<
  TFieldValues,
  TName,
  Value,
  Multiple,
  DisableClearable,
  FreeSolo,
  ChipComponent
>) {
  const {field} = useController({
    name,
    control,
    rules,
  });

  return (
    <MuiAutocomplete
      onChange={onChange
        ?? function(_event, value) {
          field.onChange(value);
        }}
      onBlur={field.onBlur}
      value={field.value}
      {...props}
    />
  );
}

Autocomplete.displayName = 'MuiReactHookFormAutocomplete';
