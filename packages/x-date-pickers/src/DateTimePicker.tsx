import {
  Path,
  RegisterOptions,
  useController,
  FieldValues,
  useFormContext,
} from "react-hook-form";
import {
  DateTimePicker as MuiDateTimePicker,
  DateTimePickerProps as MuiDateTimePickerProps,
} from "@mui/x-date-pickers";
import TextField from "@mui/material/TextField";
import { format } from "date-fns";

export interface DateTimePickerProps<
  TInputDate,
  TDate,
  TFieldValues extends FieldValues = FieldValues
> extends Omit<MuiDateTimePickerProps<TInputDate, TDate>, "value"> {
  name: Path<TFieldValues>;
  rules?: RegisterOptions;
}

export function DateTimePicker<TInputDate, TDate, TFieldValues>({
  name,
  rules,
  ...props
}: DateTimePickerProps<TInputDate, TDate, TFieldValues>) {
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
    <MuiDateTimePicker
      {...props}
      onChange={onChange}
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
