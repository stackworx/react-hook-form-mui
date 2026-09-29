import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import {
  HelperTextProvider,
  useFormErrorMessages,
} from '@stackworx/react-hook-form-mui';
import type {ReactNode} from 'react';
import {useForm, useFormState, useWatch} from 'react-hook-form';
import type {Control, DefaultValues, FieldValues} from 'react-hook-form';
import {action} from 'storybook/actions';
import {formArgs} from './controls';
import type {FormArgs} from './controls';

function FormValues<T extends FieldValues>({control}: {control: Control<T>}) {
  const values = useWatch({control});
  const {errors, isDirty, isValid, isSubmitted} = useFormState({control});
  const messages = useFormErrorMessages();
  const errorMessages = Object.fromEntries(
    Object.entries(errors).map(([name, error]) => {
      const type = typeof error?.type === 'string' ? error.type : undefined;
      const message = typeof error?.message === 'string' ? error.message : '';
      return [
        name,
        message !== '' ? message : (type && (messages[type] ?? type)),
      ];
    }),
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

function StoryForm<T extends FieldValues>({
  defaultValues,
  settings,
  children,
}: {
  defaultValues?: DefaultValues<T>;
  settings: FormArgs;
  children: (control: Control<T>) => ReactNode;
}) {
  const {control, handleSubmit, reset} = useForm<T>({
    defaultValues,
    mode: settings.formMode,
    disabled: settings.formDisabled,
  });
  return (
    <HelperTextProvider reserve={settings.formReserveHelperText}>
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
    </HelperTextProvider>
  );
}

/**
 * Renders fields inside a form and shows the live values with `useWatch` (never `watch()`). `settings`
 * are the story's Form controls.
 */
export function FormStory<T extends FieldValues>({
  defaultValues,
  settings,
  children,
}: {
  defaultValues?: DefaultValues<T>;
  settings?: Partial<FormArgs>;
  children: (control: Control<T>) => ReactNode;
}) {
  const resolved = {...formArgs, ...settings};
  // React Hook Form reads `mode` when it creates the form, so a new mode needs a new form.
  return (
    <StoryForm<T>
      key={resolved.formMode}
      defaultValues={defaultValues}
      settings={resolved}
    >
      {children}
    </StoryForm>
  );
}
