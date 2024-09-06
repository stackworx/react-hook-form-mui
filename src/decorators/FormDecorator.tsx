import { useForm } from 'react-hook-form';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { Form } from '../stories/Form';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Stack from '@mui/material/Stack';
import { UseFormProps } from 'react-hook-form/dist/types';
import { action } from '@storybook/addon-actions';
import { PropsWithChildren } from 'react';
import Paper from '@mui/material/Paper';

type Props = PropsWithChildren<{ formProps: UseFormProps }>;

export function FormDecorator({ formProps, children }: Props) {
  const form = useForm(formProps);

  const values = form.watch();

  // destructure to trigger rerender
  const { errors, dirtyFields, defaultValues, isDirty, isValid } =
    form.formState;

  const formState = {
    errors,
    dirtyFields,
    defaultValues,
    isDirty,
    isValid,
    values,
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={'en'}>
      <Form
        {...form}
        onSubmit={(val) => {
          action('submit')(val);
        }}
      >
        <Stack>{children}</Stack>
        <Paper>
          <pre>{JSON.stringify(formState, null, 2)}</pre>
        </Paper>
      </Form>
    </LocalizationProvider>
  );
}
