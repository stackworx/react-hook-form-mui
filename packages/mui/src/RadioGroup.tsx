import {
  Path,
  RegisterOptions,
  Control,
  FieldErrors,
  useController,
  FieldValues,
} from "react-hook-form";
import MuiRadioGroup, {
  RadioGroupProps as MuiRadioGroupProps,
} from "@mui/material/RadioGroup";

export interface RadioGroupProps<TFieldValues extends FieldValues = FieldValues>
  extends Omit<
    MuiRadioGroupProps,
    "checked" | "name" | "value" | "defaultChecked" | "form"
  > {
  name: Path<TFieldValues>;
  rules?: RegisterOptions;
  control: Control<TFieldValues>;
  errors: FieldErrors<TFieldValues>;
}

export function RadioGroup<TFieldValues>({
  control,
  name,
  rules,
  ...props
}: RadioGroupProps<TFieldValues>) {
  const {
    field: { onChange, onBlur, value, ref },
  } = useController({
    name,
    control,
    rules,
  });

  return (
    <MuiRadioGroup
      {...props}
      checked={Boolean(value)}
      inputRef={ref}
      onChange={onChange}
      onBlur={onBlur}
      value={value}
      required={!!rules?.required}
      name={name}
    />
  );
}
