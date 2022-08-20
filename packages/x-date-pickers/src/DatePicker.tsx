import {
  Path,
  RegisterOptions,
  Control,
  FieldErrors,
  useController,
  FieldValues,
  UseFormSetError,
  UseFormClearErrors,
} from "react-hook-form";
import {
  DatePicker as MuiDatePicker,
  DatePickerProps as MuiDatePickerProps,
} from "@mui/x-date-pickers";
import TextField from "@mui/material/TextField";
import { format } from "date-fns";

export interface DatePickerProps<
  TInputDate,
  TDate,
  TFieldValues extends FieldValues = FieldValues
> extends Omit<MuiDatePickerProps<TInputDate, TDate>, "value"> {
  name: Path<TFieldValues>;
  rules?: RegisterOptions;
  control: Control<TFieldValues>;
  setError: UseFormSetError<TFieldValues>;
  clearErrors: UseFormClearErrors<TFieldValues>;
  errors: FieldErrors<TFieldValues>;
}

export function DatePicker<TInputDate, TDate, TFieldValues>({
  control,
  name,
  rules,
  setError,
  clearErrors,
  ...props
}: DatePickerProps<TInputDate, TDate, TFieldValues>) {
  const {
    field: { onChange, value, ref },
    fieldState,
  } = useController({
    name,
    control,
    rules,
  });

  return (
    <MuiDatePicker
      {...props}
      onChange={onChange}
      // @ts-expect-error
      value={value}
      onError={(reason, value) => {
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
