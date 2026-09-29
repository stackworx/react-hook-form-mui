import type {ReactNode} from 'react';

/** One choice in an option-driven field; `value` is what the form stores. */
export interface FieldOption<TValue> {
  value: TValue;
  label: ReactNode;
  disabled?: boolean;
}

/** Option values the group components can store: compared with `Object.is`, keyed by `String`. */
export type OptionValue = string | number | boolean;

/** The option to attach the RHF ref to: the first selected one, else the first enabled one. */
export function focusTargetIndex<TValue>(
  options: readonly FieldOption<TValue>[],
  isSelected: (value: TValue) => boolean,
): number {
  const selected = options.findIndex((option) =>
    !option.disabled && isSelected(option.value)
  );
  return selected >= 0
    ? selected
    : options.findIndex((option) => !option.disabled);
}
