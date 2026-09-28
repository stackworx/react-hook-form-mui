/** Calls each defined handler in order, so a consumer handler runs alongside the RHF binding. */
export function composeHandlers<A extends unknown[]>(
  ...handlers: (((...args: A) => void) | undefined)[]
): (...args: A) => void {
  return (...args: A) => {
    for (const handler of handlers) handler?.(...args);
  };
}
