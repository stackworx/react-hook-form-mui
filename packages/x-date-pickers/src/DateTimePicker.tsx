import {
  FieldValues,
  Path,
  useController,
  UseControllerProps,
  useFormContext,
} from 'react-hook-form';
import {
  DateTimePicker as MuiDateTimePicker,
  type DateTimePickerProps as MuiDateTimePickerProps,
} from '@mui/x-date-pickers/DateTimePicker';
import { format } from 'date-fns';
import { PickerValidDate } from '@mui/x-date-pickers/models';

type DateTimePickerProps<
  TDate extends PickerValidDate,
  TEnableAccessibleFieldDOMStructure extends boolean = false,
  TName extends Path<TFieldValues> = Path<FieldValues>,
  TFieldValues extends FieldValues = FieldValues,
> = Omit<
  MuiDateTimePickerProps<TDate, TEnableAccessibleFieldDOMStructure>,
  'value'
> &
  UseControllerProps<TFieldValues, TName>;

export function DateTimePicker<
  TDate,
  TEnableAccessibleFieldDOMStructure extends boolean = false,
  TName extends Path<TFieldValues> = Path<FieldValues>,
  TFieldValues extends FieldValues = FieldValues,
>({
  name,
  rules,
  ...props
}: DateTimePickerProps<
  TDate,
  TEnableAccessibleFieldDOMStructure,
  TName,
  TFieldValues
>) {
  const { slotProps, ...otherPickerProps } = props;

  const { textField, ...otherSlotProps } = slotProps;

  const { setError, clearErrors, control } = useFormContext();
  const {
    field: { onChange, value, ref, onBlur },
    fieldState,
  } = useController({
    name,
    control,
    rules,
  });

  return (
    <MuiDateTimePicker
      onChange={onChange}
      value={value}
      slotProps={{
        slotProps: {
          textField: {
            inputRef: ref,
            error: !!fieldState.error,
            helperText: fieldState.error.message ?? textField.helperText ?? ' ',
            onBlur,
            ...textField,
          },
          ...otherSlotProps,
        },
      }}
      onError={(reason) => {
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
              message: `Date should not be after ${format(props.maxDate, 'P')}`,
            });
            break;

          case 'minDate':
            setError(name, {
              type: 'min',
              message: `Date should not be before ${format(
                props.minDate,
                'P'
              )}`,
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
