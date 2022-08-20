import {
  Path,
  RegisterOptions,
  Control,
  useController,
  FieldValues,
} from "react-hook-form";
import MuiCheckbox, {
  CheckboxProps as MuiCheckboxProps,
} from "@mui/material/Checkbox";

export interface CheckboxProps<TFieldValues extends FieldValues = FieldValues>
  extends Omit<
    MuiCheckboxProps,
    "checked" | "name" | "value" | "defaultChecked" | "form"
  > {
  name: Path<TFieldValues>;
  rules?: RegisterOptions;
  control: Control<TFieldValues>;
}

export function Checkbox<TFieldValues>({
  control,
  name,
  rules,
  ...props
}: CheckboxProps<TFieldValues>) {
  const {
    field: { onChange, onBlur, value, ref },
  } = useController({
    name,
    control,
    rules,
  });

  return (
    <MuiCheckbox
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

Checkbox.displayName = "MuiReactHookFormCheckbox";
