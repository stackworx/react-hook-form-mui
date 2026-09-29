import {createContext, use} from 'react';
import type {ReactNode} from 'react';

const ReserveContext = createContext(true);

export interface ReserveHelperTextProps {
  /**
   * Keeps the helper text line while it's empty, so an error appearing doesn't move the fields below.
   * Defaults to the nearest `HelperTextProvider`, else `true`.
   */
  reserveHelperText?: boolean;
}

/** Sets whether the fields inside keep their empty helper text line; a field's own prop wins. */
export function HelperTextProvider({reserve, children}: {
  reserve: boolean;
  children: ReactNode;
}) {
  return <ReserveContext value={reserve}>{children}</ReserveContext>;
}

/** Whether a field keeps its empty helper text line: its own setting, else the provider's. */
export function useReserveHelperText(reserve: boolean | undefined): boolean {
  const byDefault = use(ReserveContext);
  return reserve ?? byDefault;
}

/**
 * What a field's helper line shows (the error, else its helper text, else a reserved blank) and whether
 * that describes the field.
 */
export function useHelperText(
  errorText: string | undefined,
  helperText: ReactNode,
  reserveHelperText: boolean | undefined,
): {helper: ReactNode; describes: boolean} {
  const reserve = useReserveHelperText(reserveHelperText);
  const shown = errorText ?? helperText;
  const describes = shown !== undefined && shown !== null && shown !== false
    && shown !== '';
  // MUI draws a `' '` helper text as an aria-hidden zero-width space, which keeps the line's height.
  return {helper: describes ? shown : reserve ? ' ' : undefined, describes};
}
