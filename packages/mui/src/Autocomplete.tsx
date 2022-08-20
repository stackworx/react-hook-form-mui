import {
  Path,
  RegisterOptions,
  Control,
  useController,
  FieldValues,
  UseFormSetValue,
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
  setValue: UseFormSetValue<TFieldValues>;
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
  setValue,
  onChange,
  ...props
}: AutocompleteProps<T, Multiple, DisableClearable, FreeSolo>) {
  const {
    field: { onBlur, value },
  } = useController({
    name,
    control,
    rules,
  });

  return (
    <MuiAutocomplete
      onChange={
        onChange ??
        function (_event, value) {
          setValue(name, value);
        }
      }
      onBlur={onBlur}
      value={value}
      {...props}
    />
  );
}

Autocomplete.displayName = "MuiReactHookFormAutocomplete";
