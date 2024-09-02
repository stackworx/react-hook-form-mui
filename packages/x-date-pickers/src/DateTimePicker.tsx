import TextField from '@mui/material/TextField';
import {
  DateTimePicker as MuiDateTimePicker,
  type DateTimePickerProps as MuiDateTimePickerProps,
} from '@mui/x-date-pickers/DateTimePicker';
import {PickerValidDate} from '@mui/x-date-pickers/models';
import {format} from 'date-fns';
import {
  FieldValues,
  Path,
  RegisterOptions,
  useController,
  useFormContext,
} from 'react-hook-form';

export interface DateTimePickerProps<
  TInputDate extends PickerValidDate,
  TEnableAccessibleFieldDOMStructure extends boolean = false,
  TFieldValues extends FieldValues = FieldValues,
  TName extends Path<TFieldValues> = Path<TFieldValues>,
> extends
  Omit<
    MuiDateTimePickerProps<TInputDate, TEnableAccessibleFieldDOMStructure>,
    'value'
  >
{
  name: TName;
  rules?: RegisterOptions;
}

export function DateTimePicker<
  TInputDate extends PickerValidDate,
  TEnableAccessibleFieldDOMStructure extends boolean,
  TFieldValues,
  TName,
>({
  name,
  rules,
  ...props
}: DateTimePickerProps<
  TInputDate,
  TEnableAccessibleFieldDOMStructure,
  TFieldValues,
  TName
>) {
  const {setError, clearErrors, control} = useFormContext();
  const {
    field: {onChange, value, ref, onBlur},
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
          case 'invalidDate':
            setError(name, {type: 'value', message: ''});
            break;

          case 'disablePast':
            setError(name, {message: 'Values in the past are not allowed'});
            break;

          case 'maxDate':
            setError(name, {
              type: 'max',
              message: `Date should not be after ${
                format(
                  // @ts-expect-error todo
                  props.maxDate,
                  'P',
                )
              }`,
            });
            break;

          case 'minDate':
            setError(name, {
              type: 'min',
              message: `Date should not be before ${
                format(
                  // @ts-expect-error todo
                  props.minDate,
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
      }}
      slots={{textField: TextField}}
      slotProps={{
        textField: {
          helperText: props.helperText
            ?? (fieldState.isTouched && fieldState.error?.message),
          inputRef: ref,
          error: !!fieldState.error,
          name,
          onChange,
          onBlur,
          value,
        },
      }}
      // renderInput={(params) => {
      //   // console.log(helperText, error, fieldState, params);
      //   return (
      //     <TextField
      //         {...params}
      //       name={name}
      //       inputRef={ref}
      //       error={a!!fieldState.error}
      //       // TODO: handle required error
      //       helperText={
      //         helperText ?? (fieldState.isTouched && fieldState.error?.message)
      //       }
      //       {...params}
      //     />
      //   );
      // }}
    />
  );
}
