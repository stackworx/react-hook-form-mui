import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import type {ReactElement, ReactNode} from 'react';

/** Label, error state and helper text around a single checkbox or switch. */
export function ToggleFieldShell({
  control,
  label,
  helper,
  helperId,
  error,
  disabled,
}: {
  control: ReactElement;
  label: ReactNode;
  helper: ReactNode;
  helperId: string;
  error: boolean;
  disabled: boolean | undefined;
}) {
  return (
    <FormControl error={error} disabled={disabled} variant='standard'>
      <FormControlLabel control={control} label={label} />
      {helper
        ? <FormHelperText id={helperId}>{helper}</FormHelperText>
        : null}
    </FormControl>
  );
}
