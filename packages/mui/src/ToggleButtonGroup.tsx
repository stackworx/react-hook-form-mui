import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import FormLabel from '@mui/material/FormLabel';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroupBase from '@mui/material/ToggleButtonGroup';
import type {ToggleButtonGroupProps as MuiToggleButtonGroupProps} from '@mui/material/ToggleButtonGroup';
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

export type ToggleButtonGroupProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
  TValue extends OptionValue,
  TTransformedValues = TFieldValues,
> = FieldControllerProps<TFieldValues, TName, TTransformedValues> & {
  options: readonly FieldOption<TValue>[];
  label?: ReactNode;
  helperText?: ReactNode;
  /** Lay the buttons out in a row (default) or a column. */
  row?: boolean;
  required?: boolean;
  /** `true` (default) stores `TValue | null`; `false` stores `TValue[]`. */
  exclusive?: boolean;
  /** Ignore a click that would clear the selection. */
  enforceValue?: boolean;
  size?: MuiToggleButtonGroupProps['size'];
  color?: MuiToggleButtonGroupProps['color'];
  fullWidth?: boolean;
};

/** Toggle buttons driven by options, storing one value (exclusive) or an array. */
export function ToggleButtonGroup<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
  TValue extends OptionValue,
  TTransformedValues = TFieldValues,
>(
  props: ToggleButtonGroupProps<
    TFieldValues,
    TName,
    TValue,
    TTransformedValues
  >,
) {
  const [
    controllerProps,
    {
      options,
      label,
      helperText,
      row = true,
      required,
      exclusive = true,
      enforceValue = false,
      size,
      color,
      fullWidth,
    },
  ] = splitControllerProps<
    TFieldValues,
    TName,
    ToggleButtonGroupProps<TFieldValues, TName, TValue, TTransformedValues>,
    TTransformedValues
  >(props);
  const {field, errorText, hasError} = useFieldController(controllerProps);
  const {onChange, onBlur, ref, disabled} = field;
  const labelId = useId();
  const helperId = useId();
  const helper = errorText ?? helperText;
  const current: unknown = field.value;
  const selected: readonly unknown[] = exclusive
    ? (current === null || current === undefined ? [] : [current])
    : (Array.isArray(current) ? current : []);
  const focusIndex = focusTargetIndex(
    options,
    (value) => selected.some((item) => Object.is(item, value)),
  );

  return (
    <FormControl
      error={hasError}
      disabled={disabled}
      required={required}
      fullWidth={fullWidth}
    >
      {label ? <FormLabel id={labelId}>{label}</FormLabel> : null}
      <ToggleButtonGroupBase
        aria-labelledby={label ? labelId : undefined}
        aria-describedby={helper ? helperId : undefined}
        value={exclusive ? (current ?? null) : selected}
        exclusive={exclusive}
        orientation={row ? 'horizontal' : 'vertical'}
        size={size}
        color={color}
        fullWidth={fullWidth}
        disabled={disabled}
        onChange={(_event, next: unknown) => {
          const cleared = exclusive
            ? next === null
            : Array.isArray(next) && next.length === 0;
          if (enforceValue && cleared) return;
          onChange(next);
        }}
        onBlur={onBlur}
      >
        {options.map((option, index) => (
          <ToggleButton
            key={String(option.value)}
            value={option.value}
            disabled={option.disabled}
            ref={index === focusIndex ? ref : undefined}
          >
            {option.label}
          </ToggleButton>
        ))}
      </ToggleButtonGroupBase>
      {helper ? <FormHelperText id={helperId}>{helper}</FormHelperText> : null}
    </FormControl>
  );
}
