import {
  FieldValues,
  useController,
  UseControllerProps,
  useFormContext,
  RegisterOptions,
  FieldPath,
} from 'react-hook-form';
import {
  DateTimePicker as MuiDateTimePicker,
  type DateTimePickerProps as MuiDateTimePickerProps,
} from '@mui/x-date-pickers/DateTimePicker';
import { format } from 'date-fns';
import { PickerValidDate } from '@mui/x-date-pickers/models';

type DateTimePickerProps<
  TDate extends PickerValidDate,
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TEnableAccessibleFieldDOMStructure extends boolean = false,
> = Omit<
  MuiDateTimePickerProps<TDate, TEnableAccessibleFieldDOMStructure>,
  'value'
> &
  UseControllerProps<TFieldValues, TName>;

export function DateTimePicker<
  TDate extends PickerValidDate,
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TEnableAccessibleFieldDOMStructure extends boolean = false,
>({
  name,
  rules,
  ...props
}: DateTimePickerProps<
  TDate,
  TFieldValues,
  TName,
  TEnableAccessibleFieldDOMStructure
>) {
  const { slotProps, ...otherPickerProps } = props;

  const { setError, clearErrors, control } = useFormContext();

  const {
    field: { onChange, value, ref, onBlur },
    fieldState,
  } = useController({
    name,
    control,
    rules: rules as unknown as Omit<
      RegisterOptions<FieldValues, TName>,
      'disabled' | 'valueAsNumber' | 'valueAsDate' | 'setValueAs'
    >,
  });

  return (
    <MuiDateTimePicker
      onChange={onChange}
      value={value}
      slotProps={{
        ...slotProps,
        textField: {
          ...slotProps?.textField,
          inputRef: ref,
          error: !!fieldState.error,
          onBlur,
          helperText:
            //@ts-expect-error incomplete typing
            fieldState.error?.message ?? slotProps?.textField?.helperText,
        },
      }}
      onError={(reason) => {
        switch (reason) {
          case 'invalidDate':
            setError(name, { message: 'Invalid date' });
            break;
          case 'disablePast':
            setError(name, { message: 'Values in the past are not allowed' });
            break;
          case 'disableFuture':
            setError(name, { message: 'Values in the past are not allowed' });
            break;
          case 'maxDate':
            const maxDate = props?.maxDate || props?.maxDateTime;

            setError(name, {
              type: 'max',
              message: maxDate
                ? `Date should not be after ${format(maxDate, 'P')}`
                : 'Date should not be after the specified limit',
            });

            break;
          case 'minDate':
            const minDate = props?.minDate || props?.minDateTime;

            setError(name, {
              type: 'min',
              message: minDate
                ? `Date should not be before ${format(minDate, 'P')}`
                : 'Date should not be before the specified limit',
            });
            break;
          case 'maxTime':
            const maxTime = props?.maxTime || props?.maxDateTime;

            setError(name, {
              type: 'max',
              message: maxTime
                ? `Time should not be after ${format(maxTime, 'P')}`
                : 'Time should not be after the specified limit',
            });
            break;
          case 'minTime':
            const minTime = props?.minTime || props?.minDateTime;

            setError(name, {
              type: 'min',
              message: minTime
                ? `Time should not be before ${format(minTime, 'P')}`
                : 'Time should not be before the specified limit',
            });

            break;
          case 'minutesStep':
            setError(name, {
              message: `Invalid minutes step, can only step in increments of ${props?.minutesStep ? format(props.minutesStep, 'P') : 'Invalid minutes step'}`,
            });
            break;
          case 'shouldDisableMonth':
            setError(name, { message: 'Month is not allowed' });
            break;
          case 'shouldDisableYear':
            setError(name, { message: 'Year is not allowed' });
            break;
          case 'shouldDisableDate':
            setError(name, { message: 'Date is not allowed' });
            break;
          case 'shouldDisableTime-hours':
            setError(name, { message: 'Specified hour is disabled' });
            break;
          case 'shouldDisableTime-minutes':
            setError(name, { message: 'Specified minute is disabled' });
            break;
          case 'shouldDisableTime-seconds':
            setError(name, { message: 'Specified second is disabled' });
            break;
          default:
            clearErrors(name);
        }
      }}
      {...otherPickerProps}
    />
  );
}
