import {
  Path,
  RegisterOptions,
  Control,
  FieldErrors,
  useController,
  FieldValues,
} from "react-hook-form";
import MuiSelect, { SelectProps as MuiSelectProps } from "@mui/material/Select";

export interface SelectProps<TFieldValues extends FieldValues = FieldValues>
  extends Omit<MuiSelectProps, "value"> {
  name: Path<TFieldValues>;
  rules?: RegisterOptions;
  control: Control<TFieldValues>;
  errors: FieldErrors<TFieldValues>;
}

export function Select<TFieldValues>({
  control,
  name,
  rules,
  ...props
}: SelectProps<TFieldValues>) {
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
