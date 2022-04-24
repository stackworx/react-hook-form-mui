import {
  Path,
  RegisterOptions,
  Control,
  FieldErrors,
  useController,
  FieldValues,
} from "react-hook-form";
import MuiCheckbox, {
  CheckboxProps as MuiCheckboxProps,
} from "@mui/material/Checkbox";

export interface CheckboxGroupProps<
  Group extends boolean | undefined,
  TFieldValues extends FieldValues = FieldValues
> extends Omit<
    MuiCheckboxProps,
    "checked" | "name" | "defaultChecked" | "form"
  > {
  name: Path<TFieldValues>;
  rules?: RegisterOptions;
  control: Control<TFieldValues>;
  errors: FieldErrors<TFieldValues>;
}

export function CheckboxGroup<Group extends boolean | undefined, TFieldValues>({
  control,
  name,
  rules,
  value,
  ...props
}: CheckboxGroupProps<Group, TFieldValues>) {
  const { field } = useController({
    name,
    control,
    rules,
  });

  const { onChange, onBlur, ref } = field;

  return (
    <MuiCheckbox
      {...props}
      checked={
        // @ts-expect-error must be array
        field.value.includes(value)
      }
      inputRef={ref}
      onChange={(_event, checked) => {
        if (checked) {
          onChange([
            // @ts-expect-error must be array
            ...field.value,
            value,
          ]);
        } else {
          onChange(
            // @ts-expect-error must be array
            field.value.filter((v) => v !== value)
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
