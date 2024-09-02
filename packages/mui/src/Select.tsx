import MuiTextField, {
  TextFieldProps as MuiTextFieldProps,
} from '@mui/material/TextField';
import {
  FieldPath,
  FieldValues,
  useController,
  UseControllerProps,
} from 'react-hook-form';

export type TextFieldProps<
  TName extends FieldPath<TFieldValues>,
  TFieldValues extends FieldValues = FieldValues,
> =
  & UseControllerProps<TFieldValues, TName>
  & Omit<MuiTextFieldProps, 'value' | 'name'>;

export function Select<
  TName extends FieldPath<TFieldValues>,
  TFieldValues extends FieldValues,
>({control, name, rules, ...props}: TextFieldProps<TName, TFieldValues>) {
  const {
    field: {onChange, onBlur, value, ref},
    fieldState: {error},
  } = useController({
    name,
    control,
    rules,
  });

  return (
    <MuiTextField
      {...props}
      inputRef={ref}
      onChange={onChange}
      onBlur={onBlur}
      value={value}
      name={name}
      error={!!error}
      helperText={error?.message ?? props.helperText ?? ' '}
      select // Textfield as Select
    />
  );
}

Select.displayName = 'MuiReactHookFormSelect';
