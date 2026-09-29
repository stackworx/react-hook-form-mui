/** Your change and blur handlers, and whether the form stores changes itself. */
export interface FieldHandlerProps<
  TChangeArgs extends unknown[],
  TBlurArgs extends unknown[],
> {
  /** Runs after the form stores a change, or instead of it with `suppressFormChange`. */
  handleChange?: (...args: TChangeArgs) => void;
  /** Runs after the form's blur handler, which marks the field touched. */
  handleBlur?: (...args: TBlurArgs) => void;
  /**
   * The form doesn't store changes. `handleChange` stores the ones to keep, with `setValue`; a change it
   * doesn't store is ignored.
   */
  suppressFormChange?: boolean;
}

/** `handleChange` and `handleBlur` taking the arguments of a MUI component's `onChange` and `onBlur`. */
export type MuiHandlerProps<
  TMuiProps extends {
    onChange?: ((...args: never[]) => unknown) | undefined;
    onBlur?: ((...args: never[]) => unknown) | undefined;
  },
> = FieldHandlerProps<
  Parameters<NonNullable<TMuiProps['onChange']>>,
  Parameters<NonNullable<TMuiProps['onBlur']>>
>;

/** The change handler a component gives MUI: the form's, unless suppressed, then `handleChange`. */
export function changeHandler<TArgs extends unknown[]>(
  formChange: (...args: TArgs) => void,
  {handleChange, suppressFormChange}: Pick<
    FieldHandlerProps<TArgs, never[]>,
    'handleChange' | 'suppressFormChange'
  >,
): (...args: TArgs) => void {
  return (...args) => {
    if (!suppressFormChange) formChange(...args);
    handleChange?.(...args);
  };
}
