import { FieldValues, FieldPath, useFormState } from 'react-hook-form';
import { CheckboxProps, Checkbox } from './Checkbox';

import FormControlLabel from '@mui/material/FormControlLabel';

export type CheckboxPropsWithLabelProps<
  TName extends FieldPath<TFieldValues>,
  TFieldValues extends FieldValues = FieldValues,
> = CheckboxProps<TName, TFieldValues> & { label: string };

export function CheckboxWithLabel<
  TName extends FieldPath<TFieldValues>,
  TFieldValues extends FieldValues,
>({ label, ...props }: CheckboxPropsWithLabelProps<TName, TFieldValues>) {
  const { errors } = useFormState({
    control: props.control,
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
