import {
  Path,
  RegisterOptions,
  Control,
  useController,
  FieldValues,
} from "react-hook-form";
import MuiSwitch, { SwitchProps as MuiSwitchProps } from "@mui/material/Switch";

export interface SwitchProps<TFieldValues extends FieldValues = FieldValues>
  extends Omit<
    MuiSwitchProps,
    "checked" | "name" | "value" | "defaultChecked" | "form"
  > {
  name: Path<TFieldValues>;
  rules?: RegisterOptions;
  control: Control<TFieldValues>;
}

export function Switch<TFieldValues>({
  control,
  name,
  rules,
  ...props
}: SwitchProps<TFieldValues>) {
  const {
    field: { onChange, onBlur, value, ref },
  } = useController({
    name,
    control,
    rules,
  });

  return (
    <MuiSwitch
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

Switch.displayName = "MuiReactHookFormSwitch";
