import * as React from 'react';

export interface ErrorContextType {
  required(): void;
}

// see
// https://github.com/mui/mui-x/blob/v5.15.3/packages/x-date-pickers/src/internals/hooks/validation/useDateValidation.ts
// https://github.com/mui/mui-x/blob/v5.15.3/packages/x-date-pickers/src/internals/hooks/validation/useTimeValidation.ts

export const ErrorContext = React.createContext<ErrorContextType>({
  required() {
    return 'is required';
  },
});
