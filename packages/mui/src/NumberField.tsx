import {NumberField as BaseNumberField} from '@base-ui/react/number-field';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import {createSvgIcon} from '@mui/material/utils';
import {useId} from 'react';
import type {ReactNode} from 'react';
import type {FieldPathByValue, FieldValues} from 'react-hook-form';
import {
  splitControllerProps,
  useFieldController,
} from './internal/useFieldController.js';
import type {FieldControllerProps} from './internal/useFieldController.js';
import {useHelperText} from './internal/HelperText.js';
import type {ReserveHelperTextProps} from './internal/HelperText.js';

const IncreaseIcon = createSvgIcon(
  <path d='M7.41 15.41 12 10.83l4.59 4.58L18 14l-6-6-6 6z' />,
  'KeyboardArrowUp',
);
const DecreaseIcon = createSvgIcon(
  <path d='M7.41 8.59 12 13.17l4.59-4.58L18 10l-6 6-6-6z' />,
  'KeyboardArrowDown',
);

// FormControl reads `value` from an `Input`-named child to shrink the label on the first (SSR) render.
function SSRInitialFilled(_props: {value: number | null | undefined}) {
  return null;
}
SSRInitialFilled.muiName = 'Input';

export type NumberFieldProps<
  TFieldValues extends FieldValues,
  TName extends FieldPathByValue<TFieldValues, number | null | undefined>,
  TTransformedValues = TFieldValues,
> =
  & FieldControllerProps<TFieldValues, TName, TTransformedValues>
  & ReserveHelperTextProps
  & Pick<
    BaseNumberField.Root.Props,
    | 'min'
    | 'max'
    | 'step'
    | 'smallStep'
    | 'largeStep'
    | 'format'
    | 'locale'
    | 'readOnly'
    | 'required'
  >
  & {
    label: ReactNode;
    helperText?: ReactNode;
    placeholder?: string;
    size?: 'small' | 'medium';
    fullWidth?: boolean;
    id?: string;
  };

/** A number input (Base UI NumberField in MUI outlined styling) bound to `number | null`. */
export function NumberField<
  TFieldValues extends FieldValues,
  TName extends FieldPathByValue<TFieldValues, number | null | undefined>,
  TTransformedValues = TFieldValues,
>(props: NumberFieldProps<TFieldValues, TName, TTransformedValues>) {
  const [
    controllerProps,
    {
      label,
      helperText,
      reserveHelperText,
      placeholder,
      size = 'medium',
      fullWidth,
      id: idProp,
      ...rootProps
    },
  ] = splitControllerProps<
    TFieldValues,
    TName,
    NumberFieldProps<TFieldValues, TName, TTransformedValues>,
    TTransformedValues
  >(props);
  const {field, errorText, hasError} = useFieldController(controllerProps);
  const {name, onChange, onBlur, ref, disabled} = field;
  const generatedId = useId();
  const id = idProp ?? generatedId;
  const {helper, describes} = useHelperText(
    errorText,
    helperText,
    reserveHelperText,
  );
  const helperId = `${id}-helper-text`;
  const value = field.value as number | null | undefined;

  return (
    <BaseNumberField.Root
      {...rootProps}
      name={name}
      value={value ?? null}
      onValueChange={(next) => {
        onChange(next);
      }}
      disabled={disabled}
      render={(renderProps, state) => (
        <FormControl
          ref={renderProps.ref}
          size={size}
          fullWidth={fullWidth}
          disabled={state.disabled}
          required={state.required}
          error={hasError}
          variant='outlined'
        >
          {renderProps.children}
        </FormControl>
      )}
    >
      <SSRInitialFilled value={value} />
      <InputLabel htmlFor={id}>{label}</InputLabel>
      <BaseNumberField.Input
        id={id}
        ref={ref}
        onBlur={onBlur}
        render={(inputProps, state) => (
          <OutlinedInput
            label={label}
            placeholder={placeholder}
            inputRef={inputProps.ref}
            value={state.inputValue}
            onBlur={inputProps.onBlur}
            onChange={inputProps.onChange}
            onKeyUp={inputProps.onKeyUp}
            onKeyDown={inputProps.onKeyDown}
            onFocus={inputProps.onFocus}
            slotProps={{
              input: {
                ...inputProps,
                'aria-invalid': hasError,
                'aria-describedby': describes ? helperId : undefined,
              },
            }}
            endAdornment={
              <InputAdornment
                position='end'
                sx={{
                  flexDirection: 'column',
                  maxHeight: 'unset',
                  alignSelf: 'stretch',
                  borderLeft: '1px solid',
                  borderColor: 'divider',
                  ml: 0,
                  '& button': {py: 0, flex: 1, borderRadius: 0.5},
                }}
              >
                <BaseNumberField.Increment
                  render={<IconButton size={size} aria-label='Increase' />}
                >
                  <IncreaseIcon
                    fontSize={size}
                    sx={{transform: 'translateY(2px)'}}
                  />
                </BaseNumberField.Increment>
                <BaseNumberField.Decrement
                  render={<IconButton size={size} aria-label='Decrease' />}
                >
                  <DecreaseIcon
                    fontSize={size}
                    sx={{transform: 'translateY(-2px)'}}
                  />
                </BaseNumberField.Decrement>
              </InputAdornment>
            }
            sx={{pr: 0}}
          />
        )}
      />
      {helper
        ? (
          <FormHelperText id={helperId} sx={{ml: 0}}>
            {helper}
          </FormHelperText>
        )
        : null}
    </BaseNumberField.Root>
  );
}
