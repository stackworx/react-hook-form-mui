import {AdapterLuxon} from '@mui/x-date-pickers/AdapterLuxon';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import type {ReactNode} from 'react';

/** Wraps picker tests in a Luxon LocalizationProvider with a fixed en-US format. */
export function withLuxon(node: ReactNode) {
  return (
    <LocalizationProvider dateAdapter={AdapterLuxon} adapterLocale='en-US'>
      {node}
    </LocalizationProvider>
  );
}
