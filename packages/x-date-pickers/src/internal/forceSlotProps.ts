/** Spreads `forced` over a consumer's slot props, keeping MUI's function form working. */
export function forceSlotProps<TProps extends object, TOwnerState>(
  slotProps: TProps | ((ownerState: TOwnerState) => TProps) | undefined,
  forced: (props: TProps | undefined) => Partial<TProps>,
): TProps | ((ownerState: TOwnerState) => TProps) {
  if (typeof slotProps === 'function') {
    return (ownerState: TOwnerState) => {
      const props = slotProps(ownerState);
      return {...props, ...forced(props)};
    };
  }
  return {...slotProps, ...forced(slotProps)} as TProps;
}
