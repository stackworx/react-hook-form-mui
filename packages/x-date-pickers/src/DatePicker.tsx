import {
  Control,
  FieldValues,
  Path,
  RegisterOptions,
  useController,
  UseFormClearErrors,
  useFormContext,
  UseFormSetError,
} from 'react-hook-form';
import {
  DatePicker as MuiDatePicker,
  type DatePickerProps as MuiDatePickerProps,
} from '@mui/x-date-pickers/DatePicker';
import type {PickerValidDate} from '@mui/x-date-pickers/models';
import {format} from 'date-fns';

// import { ErrorContext } from "./ErrorContext";

export interface DatePickerProps<
  TInputDate,
  TDate,
  TFieldValues extends FieldValues = FieldValues,
> extends Omit<MuiDatePickerProps<PickerValidDate>, 'value'> {
  name: Path<TFieldValues>;
  rules?: RegisterOptions;
}

export function useDatePicker<TFieldValues extends FieldValues = FieldValues>({
  name,
  rules,
  setError,
  clearErrors,
  control,
}: {
  name: Path<TFieldValues>;
  rules?: RegisterOptions;
  control: Control<TFieldValues>;
  setError: UseFormSetError<TFieldValues>;
  clearErrors: UseFormClearErrors<TFieldValues>;
}): MuiDatePickerProps<Date> {
  const {
    field: {onChange, value, ref},
    fieldState,
  } = useController({
    name,
    control,
    rules,
  });

  return {
    onChange: onChange,
    value: value,
    onError: (reason, value) => {
      // console.log(reason, value);
      switch (reason) {
        case 'invalidDate':
          // setError(name, { type: "value", message: "Test" });
          break;

        case 'disablePast':
          setError(name, {message: 'Values in the past are not allowed'});
          break;
        case 'disableFuture':
          break;
        case 'maxDate':
          console.log('Hello world');
          setError(name, {
            type: 'max',
            message: 'Hello',
            // message: `Date should not be after ${format(
            //   "2050",
            //   "P",
            // )}`,
          });
          break;

        case 'minDate':
          setError(name, {
            type: 'min',
            message: `Date should not be before ${
              format(
                // @ts-expect-error todo
                '1999',
                'P',
              )
            }`,
          });
          break;

        case 'shouldDisableDate':
          // TODO
          // shouldDisableDate returned true, render custom message according to the `shouldDisableDate` logic
          // setError(name, getShouldDisableDateError(value));
          break;

        default:
          clearErrors(name);
      }
    },
    // renderInput: ({ helperText, error, ...params }) => {
    //   // console.log(helperText, error, fieldState);
    //   return (
    //     <TextField
    //       name={name}
    //       inputRef={ref}
    //       error={error && !!fieldState.error}
    //       helperText={
    //         helperText ?? (fieldState.isTouched && fieldState.error?.message)
    //       }
    //       {...params}
    //     />
    //   );
    // },
  };
}

export function DatePicker<TInputDate, TDate, TFieldValues>({
  name,
  rules,
  ...props
}: DatePickerProps<TInputDate, TDate, FieldValues>) {
  const {setError, clearErrors, control} = useFormContext();

  const transformedProps = useDatePicker<FieldValues>({
    name,
    rules,
    setError,
    clearErrors,
    control,
  });

  return <MuiDatePicker {...transformedProps} {...props} />;
}

export function DatePickerProvider<TInputDate, TDate, TFieldValues>({
  name,
  rules,
  ...props
}: DatePickerProps<TInputDate, TDate, FieldValues>) {
  const {setError, clearErrors, control} = useFormContext();
  const transformedProps = useDatePicker<FieldValues>({
    name,
    rules,
    setError,
    clearErrors,
    control,
  });
  return <MuiDatePicker {...transformedProps} {...props} />;
}
