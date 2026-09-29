/** `Omit` that keeps a union of prop types (e.g. MUI's per-variant props) a union. */
export type DistributiveOmit<T, K extends PropertyKey> = T extends unknown
  ? Omit<T, K>
  : never;
