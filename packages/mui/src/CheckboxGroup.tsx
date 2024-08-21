import {
  useController,
  FieldValues,
  UseControllerProps,
  FieldPath,
} from "react-hook-form";
import MuiCheckbox, {
  CheckboxProps as MuiCheckboxProps,
} from "@mui/material/Checkbox";

export type CheckboxGroupProps<
  TName extends FieldPath<TFieldValues>,
  TFieldValues extends FieldValues = FieldValues,
> = UseControllerProps<TFieldValues, TName> &
  Omit<MuiCheckboxProps, "checked" | "name" | "defaultChecked" | "form">;

export function CheckboxGroup<
  TName extends FieldPath<TFieldValues>,
  TFieldValues extends FieldValues = FieldValues,
>({
  control,
  name,
  rules,
  value,
  ...props
}: CheckboxGroupProps<TName, TFieldValues>) {
  const { field } = useController({
    name,
    control,
    rules,
  });

  const { onChange, onBlur, ref } = field;

  return (
    <MuiCheckbox
      {...props}
      checked={field.value.includes(value)}
      inputRef={ref}
      onChange={(_event, checked) => {
        if (checked) {
          onChange([...field.value, value]);
        } else {
          onChange(
            // @ts-expect-error must be array
            field.value.filter((v) => v !== value),
          );
        }
      }}
      onBlur={onBlur}
      value={value}
      required={!!rules?.required}
      name={name}
    />
  );
}

CheckboxGroup.displayName = "MuiReactHookFormCheckboxGroup";
