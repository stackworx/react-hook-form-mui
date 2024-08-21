import * as React from "react";
import {
  useController,
  FieldValues,
  FieldPath,
  UseControllerProps,
} from "react-hook-form";
import MuiRadioGroup, {
  RadioGroupProps as MuiRadioGroupProps,
} from "@mui/material/RadioGroup";

export type RadioGroupProps<
  TName extends FieldPath<TFieldValues>,
  TFieldValues extends FieldValues = FieldValues,
> = UseControllerProps<TFieldValues, TName> &
  Omit<
    MuiRadioGroupProps,
    "checked" | "name" | "value" | "defaultChecked" | "form"
  >;

export function RadioGroup<
  TName extends FieldPath<TFieldValues>,
  TFieldValues extends FieldValues,
>({ control, name, rules, ...props }: RadioGroupProps<TName, TFieldValues>) {
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
