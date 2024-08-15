import * as React from "react";
import {
  Path,
  RegisterOptions,
  useController,
  FieldValues,
  useFormContext,
  Control,
  UseFormSetError,
  UseFormClearErrors,
} from "react-hook-form";
import {
  DatePicker as MuiDatePicker,
  DatePickerProps as MuiDatePickerProps,
} from "@mui/x-date-pickers";
import TextField from "@mui/material/TextField";
import { format } from "date-fns";

// import { ErrorContext } from "./ErrorContext";

export interface DatePickerProps<
  TInputDate,
  TDate,
  TFieldValues extends FieldValues = FieldValues
> extends Omit<MuiDatePickerProps<TInputDate, TDate>, "value"> {
  name: Path<TFieldValues>;
  rules?: RegisterOptions;
}

export function useDatePicker<TInputDate, TDate, TFieldValues extends FieldValues = FieldValues>({name,
  rules,
  setError,
  clearErrors,
  control
}: {
  name: string,
  rules?: RegisterOptions,
  control: Control<TFieldValues>,
  setError: UseFormSetError<TFieldValues>,
  clearErrors: UseFormClearErrors<TFieldValues>,
}): MuiDatePickerProps<TInputDate, TDate> {
  const {
    field: { onChange, value, ref },
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
      console.log(reason, value);
      switch (reason) {
        case "invalidDate":
          setError(name, { type: "value", message: "" });
          break;

        case "disablePast":
          setError(name, { message: "Values in the past are not allowed" });
          break;
        case "disableFuture":
          break;
        case "minDate":
          // TODO
          break;

        case "maxDate":
          setError(name, {
            type: "max",
            message: `Date should not be after ${format(
              // @ts-expect-error
              props.maxDate,
              "P"
            )}`,
          });
          break;

        case "minDate":
          setError(name, {
            type: "min",
            message: `Date should not be before ${format(
              // @ts-expect-error
              props.minDate,
              "P"
            )}`,
          });
          break;

        case "shouldDisableDate":
          // TODO
          // shouldDisableDate returned true, render custom message according to the `shouldDisableDate` logic
          // setError(name, getShouldDisableDateError(value));
          break;

        default:
          clearErrors(name);
      }
    },
    renderInput: ({ helperText, error, ...params }) => {
      // console.log(helperText, error, fieldState);
      return (
        <TextField
          name={name}
          inputRef={ref}
          error={error && !!fieldState.error}
          helperText={
            helperText ?? (fieldState.isTouched && fieldState.error?.message)
          }
          {...params}
        />
      );
    },
  };
}

export function DatePicker<TInputDate, TDate, TFieldValues>({
  name,
  rules,
  ...props
}: DatePickerProps<TInputDate, TDate, TFieldValues>) {
  const transformedProps = useDatePicker<TInputDate, TDate>({
    name,
    rules,
    setError,
    clearErrors,
    control
  }
  );
  return <MuiDatePicker {...transformedProps} {...props} />;
}

export function DatePickerProvider<TInputDate, TDate, TFieldValues>({
  name,
  rules,
  ...props
}: DatePickerProps<TInputDate, TDate, TFieldValues>) {
  const { setError, clearErrors, control } = useFormContext();
  const transformedProps = useDatePicker<TInputDate, TDate>({
    name,
    rules,
    setError,
    clearErrors,
    control
  });
  return <MuiDatePicker {...transformedProps} {...props} />;
}
