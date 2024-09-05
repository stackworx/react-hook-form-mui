import {
  RegisterOptions,
  useController,
  FieldValues,
  useFormContext,
  FieldPath,
  UseControllerProps,
} from 'react-hook-form';
import {
  TimePicker as MuiTimePicker,
  type TimePickerProps as MuiTimePickerProps,
} from '@mui/x-date-pickers/TimePicker';
import { format } from 'date-fns';
import { PickerValidDate } from '@mui/x-date-pickers/models';

type TimePickerProps<
  TDate extends PickerValidDate,
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TEnableAccessibleFieldDOMStructure extends boolean = false,
> = Omit<
  MuiTimePickerProps<TDate, TEnableAccessibleFieldDOMStructure>,
  'value'
> &
  UseControllerProps<TFieldValues, TName>;

export function TimePicker<
  TDate extends PickerValidDate,
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TEnableAccessibleFieldDOMStructure extends boolean = false,
>({
  name,
  rules,
  ...props
}: TimePickerProps<
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
    <MuiTimePicker
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
          case 'maxTime':
            setError(name, {
              type: 'max',
              message: `Time should not be after ${props?.maxTime ? format(props.maxTime, 'P') : 'Exceeded maximum time'}`,
            });
            break;
          case 'minTime':
            setError(name, {
              type: 'min',
              message: `Time should not be after ${props?.minTime ? format(props.minTime, 'P') : 'Exceeded minimum time'}`,
            });
            break;

          case 'minutesStep':
            setError(name, {
              message: `Invalid minutes step, can only step in increments of ${props?.minutesStep ? format(props.minutesStep, 'P') : 'Invalid minutes step'}`,
            });
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
