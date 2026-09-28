/** Error text per RHF rule type or MUI X validation code. */
export type PickerErrorMessages = Partial<Record<string, string>>;

/** English defaults, keyed by RHF rule types and MUI X validation error codes. */
export const defaultPickerErrorMessages: PickerErrorMessages = {
  required: 'Required',
  validate: 'Invalid value',
  invalidDate: 'Invalid date',
  invalidRange: 'The end is before the start',
  minDate: 'Date is too early',
  maxDate: 'Date is too late',
  disablePast: 'Date must not be in the past',
  disableFuture: 'Date must not be in the future',
  shouldDisableDate: 'Date is not available',
  shouldDisableMonth: 'Month is not available',
  shouldDisableYear: 'Year is not available',
  minTime: 'Time is too early',
  maxTime: 'Time is too late',
  minutesStep: 'Minutes are not on an allowed step',
  'shouldDisableTime-hours': 'Hour is not available',
  'shouldDisableTime-minutes': 'Minute is not available',
  'shouldDisableTime-seconds': 'Second is not available',
};

/**
 * The message for a MUI X validation error (a code, or a `[start, end]` pair for ranges),
 * or `null` when the value is valid.
 */
export function pickerErrorMessage(
  error: unknown,
  messages?: PickerErrorMessages,
): string | null {
  const code: unknown = Array.isArray(error)
    ? error.find((part) => part !== null && part !== undefined)
    : error;
  if (typeof code !== 'string') return null;
  return messages?.[code] ?? defaultPickerErrorMessages[code] ?? code;
}
