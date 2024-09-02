import MuiToggleButtonGroup, {
  ToggleButtonGroupProps as MuiToggleButtonGroupProps,
} from '@mui/material/ToggleButtonGroup';
import {
  FieldPath,
  FieldValues,
  useController,
  UseControllerProps,
} from 'react-hook-form';

export type ToggleButtonGroupProps<
  TName extends FieldPath<TFieldValues>,
  TFieldValues extends FieldValues = FieldValues,
> =
  & UseControllerProps<TFieldValues, TName>
  & Omit<MuiToggleButtonGroupProps, 'name' | 'form' | 'onChange' | 'value'>;

export function ToggleButtonGroup<
  TName extends FieldPath<TFieldValues>,
  TFieldValues extends FieldValues,
>({
  control,
  name,
  rules,
  children,
  ...props
}: ToggleButtonGroupProps<TName, TFieldValues>) {
  const {field} = useController({
    name,
    control,
    rules,
  });

  return (
    <MuiToggleButtonGroup
      {...props}
      value={field.value}
      onChange={(_event, value) => {
        field.onChange(value);
      }}
      onBlur={field.onBlur}
    >
      {children}
    </MuiToggleButtonGroup>
  );
}

ToggleButtonGroup.displayName = 'MuiReactHookFormToggleButtonGroup';
