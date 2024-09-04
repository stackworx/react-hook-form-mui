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
        console.log({ reason });
        switch (reason) {
          // TODO: set Error for all available reasons
          // and set up a corresponding story component for each one in storybook
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
            setError(name, {
              type: 'max',
              message: `Date should not be after ${props?.maxDate ? format(props.maxDate, 'P') : ''}`,
            });
            break;
          case 'minDate':
            setError(name, {
              type: 'min',
              message: `Date should not be before ${props?.minDate ? format(props.minDate, 'P') : ''}`,
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
      {...otherPickerProps}
    />
  );
}
