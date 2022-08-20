import {
  Path,
  RegisterOptions,
  Control,
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

  return (
    <MuiTextField
      {...props}
      inputRef={ref}
      onChange={onChange}
      onBlur={onBlur}
      value={value}
      name={name}
      error={!!error}
      helperText={(isTouched && error?.message) ?? "Error"}
    />
  );
}

TextField.displayName = "MuiReactHookFormTextField";
