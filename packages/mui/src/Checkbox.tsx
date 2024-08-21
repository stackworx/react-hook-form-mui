import {
  useController,
  FieldValues,
  FieldPath,
  UseControllerProps,
} from "react-hook-form";
import MuiCheckbox, {
  CheckboxProps as MuiCheckboxProps,
} from "@mui/material/Checkbox";

export type CheckboxProps<
  TName extends FieldPath<TFieldValues>,
  TFieldValues extends FieldValues = FieldValues,
> = UseControllerProps<TFieldValues, TName> &
  Omit<
    MuiCheckboxProps,
    "checked" | "name" | "value" | "defaultChecked" | "form"
  >;

export function Checkbox<
  TName extends FieldPath<TFieldValues>,
  TFieldValues extends FieldValues,
>({ control, name, rules, ...props }: CheckboxProps<TName, TFieldValues>) {
  const {
    fieldState: { error },
    field: { onChange, onBlur, value, ref },
  } = useController({
    name,
    control,
    rules,
  });

  return (
    <MuiCheckbox
      sx={(theme) => ({
        ...(error && {
          color: theme.palette.error.main,
          "&.Mui-checked": {
            color: theme.palette.error.main,
          },
        }),
        py: 0,
      })}
      {...props}
      checked={Boolean(value)}
      inputRef={ref}
      onChange={onChange}
      onBlur={onBlur}
      value={value}
      name={name}
    />
  );
}

Checkbox.displayName = "MuiReactHookFormCheckbox";
