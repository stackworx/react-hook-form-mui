import MuiCheckbox, {
  CheckboxProps as MuiCheckboxProps,
} from '@mui/material/Checkbox';
import {
  FieldPath,
  FieldValues,
  useController,
  UseControllerProps,
} from 'react-hook-form';

export type CheckboxGroupProps<
  TName extends FieldPath<TFieldValues>,
  TFieldValues extends FieldValues = FieldValues,
> =
  & UseControllerProps<TFieldValues, TName>
  & Omit<MuiCheckboxProps, 'checked' | 'name' | 'defaultChecked' | 'form'>;

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
  const {
    field,
    fieldState: {error},
  } = useController({
    name,
    control,
    rules,
  });

  const {onChange, onBlur, ref} = field;

  return (
    <MuiCheckbox
      sx={{
        ...(error && {
          color: 'error.main',
          '&.Mui-checked': {
            color: 'error.main',
          },
        }),
      }}
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
      name={name}
    />
  );
}

CheckboxGroup.displayName = 'MuiReactHookFormCheckboxGroup';
