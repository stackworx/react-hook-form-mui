import {forwardRef} from 'react';
import type {HTMLAttributes, ReactNode} from 'react';

const reachEndThresholdPx = 48;

export interface ListboxWithFooterProps
  extends HTMLAttributes<HTMLUListElement>
{
  /** Called when the list is scrolled to within 48px of its end. */
  onReachEnd: () => void;
  /** Rendered below the list, outside the listbox, so it is never an option. */
  footer: ReactNode;
}

/** Autocomplete listbox slot that reports reaching the end and shows a footer below the options. */
// forwardRef, not a ref prop: React 18 doesn't pass `ref` to function components.
export const ListboxWithFooter = forwardRef<
  HTMLUListElement,
  ListboxWithFooterProps
>(function ListboxWithFooter(
  {onReachEnd, footer, onScroll, ...listboxProps},
  ref,
) {
  return (
    <>
      <ul
        {...listboxProps}
        ref={ref}
        onScroll={(event) => {
          onScroll?.(event);
          const {scrollHeight, scrollTop, clientHeight} = event.currentTarget;
          if (scrollHeight - scrollTop - clientHeight <= reachEndThresholdPx) {
            onReachEnd();
          }
        }}
      />
      {footer}
    </>
  );
});
