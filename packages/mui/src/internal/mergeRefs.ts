import type {Ref, RefCallback} from 'react';

/** One callback ref that forwards the element to every given ref. */
export function mergeRefs<T>(...refs: (Ref<T> | undefined)[]): RefCallback<T> {
  return (value) => {
    for (const ref of refs) {
      if (typeof ref === 'function') ref(value);
      else if (ref) ref.current = value;
    }
  };
}
