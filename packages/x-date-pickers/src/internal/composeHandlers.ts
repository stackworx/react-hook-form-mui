/** Calls each defined handler in order, so a consumer handler runs alongside the RHF binding. */
export function composeHandlers<A extends unknown[]>(
  ...handlers: (((...args: A) => void) | undefined)[]
): (...args: A) => void {
  return (...args: A) => {
    for (const handler of handlers) handler?.(...args);
  };
}

/** The change handler a picker gives MUI X: the form's, unless suppressed, then `handleChange`. */
export function changeHandler<TArgs extends unknown[]>(
  formChange: (...args: TArgs) => void,
  {handleChange, suppressFormChange}: {
    handleChange?: ((...args: TArgs) => void) | undefined;
    suppressFormChange?: boolean | undefined;
  },
): (...args: TArgs) => void {
  return (...args) => {
    if (!suppressFormChange) formChange(...args);
    handleChange?.(...args);
  };
}
