import {
  Path,
  RegisterOptions,
  Control,
  useController,
  FieldValues,
  FieldPath,
  UseControllerProps,
} from "react-hook-form";
import MuiSwitch, { SwitchProps as MuiSwitchProps } from "@mui/material/Switch";

export type SwitchProps<
  TName extends FieldPath<TFieldValues>,
  TFieldValues extends FieldValues = FieldValues,
> = UseControllerProps<TFieldValues, TName> &
  Omit<
    MuiSwitchProps,
    "checked" | "name" | "value" | "defaultChecked" | "form"
  >;

export function Switch<
  TName extends FieldPath<TFieldValues>,
  TFieldValues extends FieldValues,
>({ control, name, rules, ...props }: SwitchProps<TName, TFieldValues>) {
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
