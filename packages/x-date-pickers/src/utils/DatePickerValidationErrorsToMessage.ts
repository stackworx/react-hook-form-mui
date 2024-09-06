import { DateTimePickerProps } from '@mui/x-date-pickers/DateTimePicker';
import {
  DateTimeValidationError,
  DateValidationError,
  PickerValidDate,
  TimeValidationError,
} from '@mui/x-date-pickers/models';
import { DatePickerProps } from '@mui/x-date-pickers/DatePicker';
import { TimePickerProps } from '@mui/x-date-pickers/TimePicker';

export function mapDateTimePickerValidationErrorMessage<
  TDate extends PickerValidDate,
  TEnableAccessibleFieldDOMStructure extends boolean,
>(
  error: DateTimeValidationError,
  props: DateTimePickerProps<TDate, TEnableAccessibleFieldDOMStructure>
) {
  const maxDate = props?.maxDate || props?.maxDateTime;
  const minDate = props?.minDate || props?.minDateTime;
  const maxTime = props?.maxTime || props?.maxDateTime;
  const minTime = props?.minTime || props?.minDateTime;

  switch (error) {
    case 'invalidDate':
      return 'Invalid date/time value provided';
    case 'disablePast':
      return 'Values in the past are not allowed';
    case 'disableFuture':
      return 'Values in the future are not allowed';
    case 'maxDate':
      return maxDate
        ? `Date should not be after ${maxDate}`
        : 'Date should not be after the specified limit';
    case 'minDate':
      return minDate
        ? `Date should not be before ${minDate}`
        : 'Date should not be before the specified limit';
    case 'maxTime':
      return maxTime
        ? `Time should not be after ${maxTime}`
        : 'Time should not be after the specified limit';
    case 'minTime':
      return minTime
        ? `Time should not be before ${minTime}`
        : 'Time should not be before the specified limit';
    case 'minutesStep':
      return `Invalid minutes step, can only step in increments of ${props?.minutesStep || 'Invalid minutes step'}`;
    case 'shouldDisableMonth':
      return 'Month is not allowed';
    case 'shouldDisableYear':
      return 'Year is not allowed';
    case 'shouldDisableDate':
      return 'Date is not allowed';
    case 'shouldDisableTime-hours':
      return 'Specified hour is disabled';
    case 'shouldDisableTime-minutes':
      return 'Specified minute is disabled';
    case 'shouldDisableTime-seconds':
      return 'Specified second is disabled';
    default:
      return null;
  }
}

export function mapDatePickerValidationErrorMessage<
  TDate extends PickerValidDate,
  TEnableAccessibleFieldDOMStructure extends boolean,
>(
  error: DateValidationError,
  props: DatePickerProps<TDate, TEnableAccessibleFieldDOMStructure>
) {
  const { maxDate, minDate } = props;

  switch (error) {
    case 'invalidDate':
      return 'Invalid date value provided';
    case 'disablePast':
      return 'Values in the past are not allowed';
    case 'disableFuture':
      return 'Values in the future are not allowed';
    case 'maxDate':
      return maxDate
        ? `Date should not be after ${maxDate}`
        : 'Date should not be after the specified limit';
    case 'minDate':
      return minDate
        ? `Date should not be before ${minDate}`
        : 'Date should not be before the specified limit';

    case 'shouldDisableMonth':
      return 'Month is not allowed';
    case 'shouldDisableYear':
      return 'Year is not allowed';
    case 'shouldDisableDate':
      return 'Date is not allowed';
    default:
      return null;
  }
}

export function mapTimePickerValidationErrorMessage<
  TDate extends PickerValidDate,
  TEnableAccessibleFieldDOMStructure extends boolean,
>(
  error: TimeValidationError,
  props: TimePickerProps<TDate, TEnableAccessibleFieldDOMStructure>
) {
  const { minTime, maxTime } = props;

  switch (error) {
    case 'invalidDate':
      return 'Invalid date/time value provided';
    case 'disablePast':
      return 'Values in the past are not allowed';
    case 'disableFuture':
      return 'Values in the future are not allowed';
    case 'maxTime':
      return maxTime
        ? `Time should not be after ${maxTime}`
        : 'Time should not be after the specified limit';
    case 'minTime':
      return minTime
        ? `Time should not be before ${minTime}`
        : 'Time should not be before the specified limit';
    case 'minutesStep':
      return `Invalid minutes step, can only step in increments of ${props?.minutesStep || 'Invalid minutes step'}`;
    case 'shouldDisableTime-hours':
      return 'Specified hour is disabled';
    case 'shouldDisableTime-minutes':
      return 'Specified minute is disabled';
    case 'shouldDisableTime-seconds':
      return 'Specified second is disabled';
    default:
      return null;
  }
}
