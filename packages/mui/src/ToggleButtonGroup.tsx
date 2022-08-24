import * as React from "react";
import {
  Path,
  RegisterOptions,
  Control,
  useController,
  FieldValues,
} from "react-hook-form";
import MuiToggleButtonGroup, {
  ToggleButtonGroupProps as MuiToggleButtonGroupProps,
} from "@mui/material/ToggleButtonGroup";

export interface ToggleButtonGroupProps<
  Exclusive extends undefined | boolean,
  TFieldValues extends FieldValues = FieldValues
> extends Omit<
    MuiToggleButtonGroupProps,
    "name" | "form" | "onChange" | "value"
  > {
  name: Path<TFieldValues>;
  rules?: RegisterOptions;
  control: Control<TFieldValues>;
  exclusive: Exclusive;
}

export function ToggleButtonGroup<
  Exclusive extends undefined | boolean,
  TFieldValues
>({
  control,
  name,
  rules,
  children,
  ...props
}: ToggleButtonGroupProps<Exclusive, TFieldValues>) {
  const { field } = useController({
    name,
    control,
    rules,
  });

  return (
    <MuiToggleButtonGroup
      {...props}
      value={field.value}
      onChange={(_event, value) => {
        field.onChange(value);
      }}
      onBlur={field.onBlur}
    >
      {children}
    </MuiToggleButtonGroup>
  );
}

ToggleButtonGroup.displayName = "MuiReactHookFormToggleButtonGroup";
