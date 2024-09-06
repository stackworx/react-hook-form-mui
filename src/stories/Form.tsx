import * as React from 'react';
import {
  FieldValues,
  FormProvider,
  FormProviderProps,
  SubmitHandler,
} from 'react-hook-form';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

interface FormProps<TFieldValues extends FieldValues>
  extends FormProviderProps<TFieldValues> {
  children: React.ReactNode;
  onSubmit: SubmitHandler<TFieldValues>;
}

export function Form<TFieldValues extends FieldValues>({
  children,
  onSubmit,
  ...props
}: FormProps<TFieldValues>) {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <FormProvider {...props}>
        <form onSubmit={props.handleSubmit(onSubmit)}>
          <Box sx={{ p: 2 }}>
            {children}
            <Stack sx={{ p: 1 }} direction="row">
              <Button
                sx={{ m: 1 }}
                variant="contained"
                color="primary"
                type="submit"
              >
                Submit
              </Button>
              <Button
                sx={{ m: 1 }}
                variant="contained"
                color="secondary"
                onClick={() => props.reset()}
              >
                Reset
              </Button>
            </Stack>
          </Box>
        </form>
      </FormProvider>
    </LocalizationProvider>
  );
}
