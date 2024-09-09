import { FieldPath, FieldValues, useFormState } from 'react-hook-form';
import { Checkbox, CheckboxProps } from './Checkbox';

import FormControlLabel from '@mui/material/FormControlLabel';

export type CheckboxPropsLabelProps<
  TName extends FieldPath<TFieldValues>,
  TFieldValues extends FieldValues = FieldValues,
> = CheckboxProps<TName, TFieldValues> & { label: string };

export function CheckboxWithLabel<
  TName extends FieldPath<TFieldValues>,
  TFieldValues extends FieldValues,
>({ label, control, ...props }: CheckboxPropsLabelProps<TName, TFieldValues>) {
  const { errors } = useFormState({
    control,
  });

  return (
    <FormControlLabel
      sx={{
        ...(errors[props.name as keyof typeof errors] && {
          color: 'error.main',
        }),
      }}
      control={<Checkbox {...props} />}
      label={label}
    />
  );
}

CheckboxWithLabel.displayName = 'MuiReactHookFormCheckboxWithLabel';
