import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import FormLabel from '@mui/material/FormLabel';
import Radio from '@mui/material/Radio';
import type {RadioProps as MuiRadioProps} from '@mui/material/Radio';
import RadioGroupBase from '@mui/material/RadioGroup';
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
import {useHelperText} from './internal/HelperText.js';
import type {ReserveHelperTextProps} from './internal/HelperText.js';

export type RadioGroupProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
  TValue extends OptionValue,
  TTransformedValues = TFieldValues,
> =
  & FieldControllerProps<TFieldValues, TName, TTransformedValues>
  & ReserveHelperTextProps
  & {
    options: readonly FieldOption<TValue>[];
    label?: ReactNode;
    helperText?: ReactNode;
    row?: boolean;
    required?: boolean;
    size?: MuiRadioProps['size'];
    color?: MuiRadioProps['color'];
  };

/** One radio per option; the form value is the chosen option's value (`TValue | null`). */
export function RadioGroup<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
  TValue extends OptionValue,
  TTransformedValues = TFieldValues,
>(props: RadioGroupProps<TFieldValues, TName, TValue, TTransformedValues>) {
  const [
    controllerProps,
    {options, label, helperText, reserveHelperText, row, required, size, color},
  ] = splitControllerProps<
    TFieldValues,
    TName,
    RadioGroupProps<TFieldValues, TName, TValue, TTransformedValues>,
    TTransformedValues
  >(props);
  const {field, errorText, hasError} = useFieldController(controllerProps);
  const {name, onChange, onBlur, ref, disabled} = field;
  const labelId = useId();
  const helperId = useId();
  const {helper, describes} = useHelperText(
    errorText,
    helperText,
    reserveHelperText,
  );
  const current: unknown = field.value;
  const selectedIndex = options.findIndex((option) =>
    Object.is(option.value, current)
  );
  const focusIndex = focusTargetIndex(
    options,
    (value) => Object.is(value, current),
  );

  return (
    <FormControl error={hasError} disabled={disabled} required={required}>
      {label ? <FormLabel id={labelId}>{label}</FormLabel> : null}
      <RadioGroupBase
        name={name}
        row={row}
        aria-labelledby={label ? labelId : undefined}
        aria-describedby={describes ? helperId : undefined}
        // MUI reports the radio's string value; the index maps it back to the typed option value.
        value={selectedIndex >= 0 ? String(selectedIndex) : ''}
        onChange={(_event, value) => {
          onChange(options[Number(value)]?.value ?? null);
        }}
        onBlur={onBlur}
      >
        {options.map((option, index) => (
          <FormControlLabel
            key={String(option.value)}
            value={String(index)}
            label={option.label}
            disabled={option.disabled}
            control={
              <Radio
                size={size}
                color={color}
                slotProps={{
                  input: {ref: index === focusIndex ? ref : undefined},
                }}
              />
            }
          />
        ))}
      </RadioGroupBase>
      {helper ? <FormHelperText id={helperId}>{helper}</FormHelperText> : null}
    </FormControl>
  );
}
