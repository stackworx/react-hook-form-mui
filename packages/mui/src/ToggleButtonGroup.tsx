import * as React from "react";
import {
  Path,
  RegisterOptions,
  Control,
  useController,
  FieldValues,
  UseFormSetValue,
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
  setValue: UseFormSetValue<TFieldValues>;
}

export function ToggleButtonGroup<
  Exclusive extends undefined | boolean,
  TFieldValues
>({
  control,
  name,
  rules,
  // TODO: handle exclusive
  exclusive,
  children,
  setValue,
  ...props
}: ToggleButtonGroupProps<Exclusive, TFieldValues>) {
  const { field } = useController({
    name,
    control,
    rules,
  });

  const { onBlur, value } = field;

  return (
    <MuiToggleButtonGroup
      {...props}
      value={value}
      onChange={(_event, value) => {
        /*
        if (exclusive) {
          setValue(name, value);
        } else {
          if (Array.isArray(field.value)) {
            setValue(name, value);
          } else {
            throw new Error(`Expected Array. Got: ${field.value}`);
          }
        }
        */
        setValue(name, value);
      }}
      onBlur={onBlur}
    >
      {children}
    </MuiToggleButtonGroup>
  );
}

ToggleButtonGroup.displayName = "MuiReactHookFormToggleButtonGroup";
