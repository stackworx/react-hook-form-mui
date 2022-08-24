import {
  Path,
  RegisterOptions,
  Control,
  useController,
  FieldValues,
} from "react-hook-form";
import MuiAutocomplete, {
  AutocompleteProps as MuiAutocompleteProps,
} from "@mui/material/Autocomplete";

export interface AutocompleteProps<
  T,
  Multiple extends boolean | undefined,
  DisableClearable extends boolean | undefined,
  FreeSolo extends boolean | undefined,
  TFieldValues extends FieldValues = FieldValues
> extends Omit<
    MuiAutocompleteProps<T, Multiple, DisableClearable, FreeSolo>,
    "name" | "value" | "defaultValue"
  > {
  name: Path<TFieldValues>;
  rules?: RegisterOptions;
  control: Control<TFieldValues>;
}

export function Autocomplete<
  T,
  Multiple extends boolean | undefined,
  DisableClearable extends boolean | undefined,
  FreeSolo extends boolean | undefined
>({
  name,
  control,
  rules,
  onChange,
  ...props
}: AutocompleteProps<T, Multiple, DisableClearable, FreeSolo>) {
  const { field } = useController({
    name,
    control,
    rules,
  });

  return (
    <MuiAutocomplete
      onChange={
        onChange ??
        function (_event, value) {
          field.onChange(value);
        }
      }
      onBlur={field.onBlur}
      value={field.value}
      {...props}
    />
  );
}

Autocomplete.displayName = "MuiReactHookFormAutocomplete";
