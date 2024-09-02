import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import {AdapterDateFns} from '@mui/x-date-pickers/AdapterDateFns';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import * as React from 'react';
import {
  FieldValues,
  SubmitHandler,
  UseFormGetValues,
  UseFormReturn,
} from 'react-hook-form';

interface FormProps<TFieldValues extends FieldValues>
  extends UseFormReturn<TFieldValues>
{
  children: React.ReactNode;
  onSubmit: SubmitHandler<TFieldValues>;
}

function Values<TFieldValues extends FieldValues>({
  getValues,
}: {
  getValues: UseFormGetValues<TFieldValues>;
}) {
  const [values, setValues] = React.useState(() => getValues());
  React.useEffect(() => {
    const ref = setInterval(() => {
      const v = getValues();
      setValues(v);
    }, 200);

    return () => {
      clearInterval(ref);
    };
  }, [getValues]);

  return <pre>Values: {JSON.stringify(values, null, 2)}</pre>;
}

export function Form<TFieldValues extends FieldValues>({
  handleSubmit,
  children,
  getValues,
  reset,
  onSubmit,
}: FormProps<TFieldValues>) {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box sx={{p: 2}}>
          <>{children}</>
          <Values getValues={getValues} />
          {/* <Errors errors={formState.errors} /> */}
          <Stack sx={{p: 1}} direction='row'>
            <Button
              sx={{m: 1}}
              variant='contained'
              color='primary'
              type='submit'
            >
              Submit
            </Button>
            <Button
              sx={{m: 1}}
              variant='contained'
              color='secondary'
              onClick={() => reset()}
            >
              Reset
            </Button>
          </Stack>
        </Box>
      </form>
    </LocalizationProvider>
  );
}
