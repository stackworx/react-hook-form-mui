import * as React from "react";
import {
  Path,
  RegisterOptions,
  Control,
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
}

export function RadioGroup<TFieldValues>({
  control,
  name,
  rules,
  ...props
}: RadioGroupProps<TFieldValues>) {
  const {
    field: { onChange, onBlur, value },
  } = useController({
    name,
    control,
    rules,
  });

  return (
    <MuiRadioGroup
      {...props}
      onChange={onChange}
      onBlur={onBlur}
      value={value}
      name={name}
    />
  );
}

RadioGroup.displayName = "MuiReactHookFormRadioGroup";
