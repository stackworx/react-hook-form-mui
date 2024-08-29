import {
  Path,
  RegisterOptions,
  useController,
  FieldValues,
  useFormContext,
} from 'react-hook-form';
import {
  default as MuiTimePicker,
  type TimePickerProps as MuiTimePickerProps,
} from '@mui/x-date-pickers/TimePicker';
import TextField from '@mui/material/TextField';
import { format } from 'date-fns';

export interface TimePickerProps<
  TInputDate,
  TDate,
  TFieldValues extends FieldValues = FieldValues,
> extends Omit<MuiTimePickerProps<TInputDate, TDate>, 'value'> {
  name: Path<TFieldValues>;
  rules?: RegisterOptions;
}

export function TimePicker<TInputDate, TDate, TFieldValues>({
  name,
  rules,
  ...props
}: TimePickerProps<TInputDate, TDate, TFieldValues>) {
  const { setError, clearErrors, control } = useFormContext();
  const {
    field: { onChange, value, ref },
    fieldState,
  } = useController({
    name,
    control,
    rules,
  });

  return (
    <MuiTimePicker
      {...props}
      onChange={onChange}
      value={value}
      onError={(reason, value) => {
        console.log(reason, value);
        switch (reason) {
          case 'invalidDate':
            setError(name, { type: 'value', message: '' });
            break;

          case 'minutesStep':
            // TODO
            break;

          case 'maxTime':
            setError(name, {
              type: 'max',
              message: `Date should not be after ${format(
                // @ts-expect-error todo
                props.maxDate,
                'P'
              )}`,
            });
            break;
          case 'minTime':
            setError(name, {
              type: 'min',
              message: `Date should not be before ${format(
                // @ts-expect-error todo
                props.minDate,
                'P'
              )}`,
            });
            break;

          case 'shouldDisableTime-hours':
          case 'shouldDisableTime-minutes':
          case 'shouldDisableTime-seconds':
            // TODO
            // shouldDisableDate returned true, render custom message according to the `shouldDisableDate` logic
            // setError(name, getShouldDisableDateError(value));
            break;

          default:
            clearErrors(name);
        }
      }}
      renderInput={({ helperText, error, ...params }) => {
        console.log(helperText, error, fieldState, params);
        return (
          <TextField
            name={name}
            inputRef={ref}
            error={error && !!fieldState.error}
            // TODO: handle required error
            helperText={
              helperText ?? (fieldState.isTouched && fieldState.error?.message)
            }
            {...params}
          />
        );
      }}
    />
  );
}
