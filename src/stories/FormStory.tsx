import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import type {ReactNode} from 'react';
import {useForm, useFormState, useWatch} from 'react-hook-form';
import type {Control, DefaultValues, FieldValues, Mode} from 'react-hook-form';
import {action} from 'storybook/actions';

function FormValues<T extends FieldValues>({control}: {control: Control<T>}) {
  const values = useWatch({control});
  const {errors, isDirty, isValid, isSubmitted} = useFormState({control});
  const errorMessages = Object.fromEntries(
    Object.entries(errors).map(([name, error]) => [name, error?.message]),
  );
  return (
    <Paper variant='outlined' sx={{p: 2}}>
      <Typography variant='overline'>Form state</Typography>
      <pre style={{margin: 0}}>
        {JSON.stringify(
          {values, errors: errorMessages, isDirty, isValid, isSubmitted},
          null,
          2,
        )}
      </pre>
    </Paper>
  );
}

/** Renders fields inside a form and shows the live values with `useWatch` (never `watch()`). */
export function FormStory<T extends FieldValues>({
  defaultValues,
  mode = 'onTouched',
  children,
}: {
  defaultValues?: DefaultValues<T>;
  mode?: Mode;
  children: (control: Control<T>) => ReactNode;
}) {
  const {control, handleSubmit, reset} = useForm<T>({defaultValues, mode});
  return (
    <form
      noValidate
      onSubmit={(event) => {
        void handleSubmit(action('submit'))(event);
      }}
    >
      <Stack spacing={3} sx={{maxWidth: 480}}>
        {children(control)}
        <Stack direction='row' spacing={1}>
          <Button type='submit' variant='contained'>Submit</Button>
          <Button
            onClick={() => {
              reset();
            }}
          >
            Reset
          </Button>
        </Stack>
        <FormValues control={control} />
      </Stack>
    </form>
  );
}
