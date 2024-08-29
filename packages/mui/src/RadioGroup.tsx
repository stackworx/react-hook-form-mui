import {
  useController,
  FieldValues,
  FieldPath,
  UseControllerProps,
  useFormState,
  Control,
  FieldError,
} from 'react-hook-form';
import MuiRadioGroup, {
  RadioGroupProps as MuiRadioGroupProps,
  useRadioGroup,
} from '@mui/material/RadioGroup';
import { default as MuiRadio, type RadioProps } from '@mui/material/Radio';

export type RadioGroupProps<
  TName extends FieldPath<TFieldValues>,
  TFieldValues extends FieldValues = FieldValues,
> = UseControllerProps<TFieldValues, TName> &
  Omit<
    MuiRadioGroupProps,
    'checked' | 'name' | 'value' | 'defaultChecked' | 'form'
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

RadioGroup.displayName = 'MuiReactHookFormRadioGroup';

interface MyRadioProps<T extends FieldValues> extends RadioProps {
  control: Control<T>;
}

export function Radio<T extends FieldValues>({
  control,
  ...props
}: MyRadioProps<T>) {
  const radioGroup = useRadioGroup();
  const { errors } = useFormState({ control });

  const fieldName = radioGroup?.name || props.name || '';
  const fieldError = (errors as Record<string, FieldError>)[fieldName];

  const showError = !!fieldError;

  return (
    <MuiRadio
      sx={{
        ...(showError && {
          '& .MuiSvgIcon-root': {
            color: 'error.main',
          },
        }),
      }}
      {...props}
    />
  );
}
