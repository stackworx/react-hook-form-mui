import {
  Path,
  RegisterOptions,
  Control,
  FieldErrors,
  useController,
  FieldValues,
} from "react-hook-form";
import MuiTextField, {
  TextFieldProps as MuiTextFieldProps,
} from "@mui/material/TextField";

export interface TextFieldProps<TFieldValues extends FieldValues = FieldValues>
  extends Omit<MuiTextFieldProps, "value"> {
  name: Path<TFieldValues>;
  rules?: RegisterOptions;
  control: Control<TFieldValues>;
  errors: FieldErrors<TFieldValues>;
}

export function TextField<TFieldValues>({
  control,
  name,
  rules,
  ...props
}: TextFieldProps<TFieldValues>) {
  const {
    field: { onChange, onBlur, value, ref },
    fieldState: { isTouched, error },
  } = useController({
    name,
    control,
    rules,
  });

  console.log(isTouched, error);

  return (
    <MuiTextField
      {...props}
      inputRef={ref}
      onChange={onChange}
      onBlur={onBlur}
      value={value}
      name={name}
      error={!!error}
      // TODO: handle required error
      helperText={isTouched && error?.message}
    />
  );
}
