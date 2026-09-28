import type {HTMLAttributes, ReactNode, Ref} from 'react';

const reachEndThresholdPx = 48;

export interface ListboxWithFooterProps
  extends HTMLAttributes<HTMLUListElement>
{
  ref?: Ref<HTMLUListElement>;
  /** Called when the list is scrolled to within 48px of its end. */
  onReachEnd: () => void;
  /** Rendered below the list, outside the listbox, so it is never an option. */
  footer: ReactNode;
}

/** Autocomplete listbox slot that reports reaching the end and shows a footer below the options. */
export function ListboxWithFooter({
  ref,
  onReachEnd,
  footer,
  onScroll,
  ...listboxProps
}: ListboxWithFooterProps) {
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
}
