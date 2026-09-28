import CheckboxBase from '@mui/material/Checkbox';
import type {CheckboxProps as MuiCheckboxProps} from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import FormHelperText from '@mui/material/FormHelperText';
import FormLabel from '@mui/material/FormLabel';
import {useId} from 'react';
import type {ReactNode} from 'react';
import type {FieldPath, FieldValues} from 'react-hook-form';
import {focusTargetIndex} from './internal/FieldOption.js';
import type {FieldOption, OptionValue} from './internal/FieldOption.js';
import {
  splitControllerProps,
  useFieldController,
} from './internal/useFieldController.js';
import type {FieldControllerProps} from './internal/useFieldController.js';

export type CheckboxGroupProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
  TValue extends OptionValue,
  TTransformedValues = TFieldValues,
> = FieldControllerProps<TFieldValues, TName, TTransformedValues> & {
  options: readonly FieldOption<TValue>[];
  label?: ReactNode;
  helperText?: ReactNode;
  row?: boolean;
  required?: boolean;
  size?: MuiCheckboxProps['size'];
  color?: MuiCheckboxProps['color'];
};

/** One checkbox per option; the form value is the array of checked option values. */
export function CheckboxGroup<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
  TValue extends OptionValue,
  TTransformedValues = TFieldValues,
>(props: CheckboxGroupProps<TFieldValues, TName, TValue, TTransformedValues>) {
  const [
    controllerProps,
    {options, label, helperText, row, required, size, color},
  ] = splitControllerProps<
    TFieldValues,
    TName,
    CheckboxGroupProps<TFieldValues, TName, TValue, TTransformedValues>,
    TTransformedValues
  >(props);
  const {field, errorText, hasError} = useFieldController(controllerProps);
  const {name, onChange, onBlur, ref, disabled} = field;
  const helperId = useId();
  const helper = errorText ?? helperText;
  const current: unknown = field.value;
  const selected: readonly unknown[] = Array.isArray(current) ? current : [];
  const isSelected = (value: TValue) =>
    selected.some((item) => Object.is(item, value));
  const focusIndex = focusTargetIndex(options, isSelected);

  return (
    <FormControl
      component='fieldset'
      variant='standard'
      error={hasError}
      disabled={disabled}
      required={required}
      aria-describedby={helper ? helperId : undefined}
    >
      {label ? <FormLabel component='legend'>{label}</FormLabel> : null}
      <FormGroup row={row}>
        {options.map((option, index) => (
          <FormControlLabel
            key={String(option.value)}
            label={option.label}
            disabled={option.disabled}
            control={
              <CheckboxBase
                name={name}
                size={size}
                color={color}
                checked={isSelected(option.value)}
                onChange={(_event, checked) => {
                  const without = selected.filter((item) =>
                    !Object.is(item, option.value)
                  );
                  onChange(checked ? [...without, option.value] : without);
                }}
                onBlur={onBlur}
                slotProps={{
                  input: {ref: index === focusIndex ? ref : undefined},
                }}
              />
            }
          />
        ))}
      </FormGroup>
      {helper ? <FormHelperText id={helperId}>{helper}</FormHelperText> : null}
    </FormControl>
  );
}
