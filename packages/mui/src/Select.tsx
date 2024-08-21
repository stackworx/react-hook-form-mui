import {
  Path,
  RegisterOptions,
  Control,
  useController,
  FieldValues,
  FieldPath,
  UseControllerProps,
} from "react-hook-form";
import MuiSelect, { SelectProps as MuiSelectProps } from "@mui/material/Select";

export type SelectProps<
  TName extends FieldPath<TFieldValues>,
  TFieldValues extends FieldValues = FieldValues,
> = UseControllerProps<TFieldValues, TName> &
  Omit<MuiSelectProps, "value" | "name">;

export function Select<
  TName extends FieldPath<TFieldValues>,
  TFieldValues extends FieldValues,
>({ control, name, rules, ...props }: SelectProps<TName, TFieldValues>) {
  const {
    field: { onChange, onBlur, value, ref },
    fieldState: { isTouched, error },
  } = useController({
    name,
    control,
    rules,
  });

  return (
    <MuiSelect
      {...props}
      inputRef={ref}
      onChange={onChange}
      onBlur={onBlur}
      value={value}
      name={name}
      error={!!error}
    />
  );
}

Select.displayName = "MuiReactHookFormSelect";
