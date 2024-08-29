import { StoryFn, Meta } from '@storybook/react';
import { useForm } from 'react-hook-form';
import type { AutocompleteRenderInputParams } from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

import { Autocomplete } from '../../packages/mui/src/Autocomplete';
import { Form } from './Form';
import { Movie, top100Films } from './data';

export default {
  title: 'Core/Autocomplete',
  component: Autocomplete,
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: { onSubmit: { action: 'submit' } },
} as Meta<typeof Autocomplete>;

const Template: StoryFn<typeof Autocomplete> = (args: any) => {
  const formProps = useForm<{
    autocomplete: any;
  }>({
    defaultValues: {
      autocomplete: args.multiple ? [] : top100Films[0],
    },
  });
  const {
    formState: { touchedFields, errors },
  } = formProps;
  return (
    <Form {...formProps} onSubmit={args.onSubmit}>
      <Autocomplete
        name="autocomplete"
        label="Autocoplete"
        options={top100Films}
        getOptionLabel={(option: Movie) => option.title}
        style={{ width: 300 }}
        control={formProps.control}
        errors={formProps.formState.errors}
        renderInput={(params: AutocompleteRenderInputParams) => (
          <TextField
            {...params}
            name="single"
            error={touchedFields['autocomplete'] && !!errors['autocomplete']}
            helperText={
              errors['autocomplete']?.message ?? args.helperText ?? ' '
            }
            label="Single"
            variant="outlined"
          />
        )}
        {...args}
      />
    </Form>
  );
};

export const Default = {
  render: Template,
};

export const Multiple = {
  render: Template,
  args: { multiple: true },
};
export const Required = {
  render: Template,

  args: {
    rules: { required: 'Required' },
  },
};

export const WithHelperText = {
  render: Template,
  args: {
    rules: { required: 'Required' },
    helperText: 'Should be overwritten by error',
  },
};
