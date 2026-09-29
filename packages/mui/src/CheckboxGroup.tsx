import CheckboxBase from '@mui/material/Checkbox';
import type {CheckboxProps as MuiCheckboxProps} from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import FormHelperText from '@mui/material/FormHelperText';
import FormLabel from '@mui/material/FormLabel';
import {useId} from 'react';
import type {ChangeEvent, ReactNode} from 'react';
import type {FieldPath, FieldValues} from 'react-hook-form';
import {composeHandlers} from './internal/composeHandlers.js';
import {changeHandler} from './internal/fieldHandlers.js';
import type {FieldHandlerProps} from './internal/fieldHandlers.js';
import {focusTargetIndex} from './internal/FieldOption.js';
import type {FieldOption, OptionValue} from './internal/FieldOption.js';
import {
  splitControllerProps,
  useFieldController,
} from './internal/useFieldController.js';
import type {FieldControllerProps} from './internal/useFieldController.js';
import {useHelperText} from './internal/HelperText.js';
import type {ReserveHelperTextProps} from './internal/HelperText.js';

type MuiBlurArgs = Parameters<NonNullable<MuiCheckboxProps['onBlur']>>;

export type CheckboxGroupProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
  TValue extends OptionValue,
  TTransformedValues = TFieldValues,
> =
  & FieldControllerProps<TFieldValues, TName, TTransformedValues>
  & ReserveHelperTextProps
  & FieldHandlerProps<
    [event: ChangeEvent<HTMLInputElement>, values: TValue[]],
    MuiBlurArgs
  >
  & {
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
    {
      options,
      label,
      helperText,
      reserveHelperText,
      row,
      required,
      size,
      color,
      handleChange,
      handleBlur,
      suppressFormChange,
    },
  ] = splitControllerProps<
    TFieldValues,
    TName,
    CheckboxGroupProps<TFieldValues, TName, TValue, TTransformedValues>,
    TTransformedValues
  >(props);
  const {field, errorText, hasError} = useFieldController(controllerProps);
  const {name, onChange, onBlur, ref, disabled} = field;
  const helperId = useId();
  const {helper, describes} = useHelperText(
    errorText,
    helperText,
    reserveHelperText,
  );
  const current: unknown = field.value;
  const selected: readonly unknown[] = Array.isArray(current) ? current : [];
  const isSelected = (value: TValue) =>
    selected.some((item) => Object.is(item, value));
  const focusIndex = focusTargetIndex(options, isSelected);
  const change = changeHandler<
    [event: ChangeEvent<HTMLInputElement>, values: TValue[]]
  >((_event, values) => {
    onChange(values);
  }, {handleChange, suppressFormChange});

  return (
    <FormControl
      component='fieldset'
      variant='standard'
      error={hasError}
      disabled={disabled}
      required={required}
      aria-describedby={describes ? helperId : undefined}
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
                onChange={(event, checked) => {
                  const without = selected.filter((item) =>
                    !Object.is(item, option.value)
                  ) as TValue[];
                  change(event, checked ? [...without, option.value] : without);
                }}
                onBlur={composeHandlers<MuiBlurArgs>(onBlur, handleBlur)}
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
