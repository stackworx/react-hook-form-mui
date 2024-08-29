import Stack from '@mui/material/Stack';
import MenuItem from '@mui/material/MenuItem';
import { StoryFn, Meta } from '@storybook/react';
import { useForm } from 'react-hook-form';

import { TextField } from '../../packages/mui/src/TextField';
import { Form } from './Form';

export default {
  title: 'Core/TextField',
  component: TextField,
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: { onSubmit: { action: 'submit' } },
} as Meta<typeof TextField>;

const Template: StoryFn<typeof TextField> = (args: any) => {
  const formProps = useForm<{
    text: any;
  }>({
    defaultValues: {
      text: args.SelectProps?.multiple ? [] : '',
    },
  });
  return (
    <Form {...formProps} onSubmit={args.onSubmit}>
      <Stack>
        <TextField
          name="text"
          label="Text"
          control={formProps.control}
          errors={formProps.formState.errors}
          {...args}
        />
      </Stack>
    </Form>
  );
};

export const Default = {
  render: Template,

  args: {
    label: 'Default',
  },
};

export const RegexCheck = {
  render: Template,

  args: {
    label: 'RegexCheck',
    helperText: 'Some text',
    rules: {
      pattern: {
        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
        message: 'Enter a valid Email Address',
      },
    },
  },
};

export const MinLength = {
  render: Template,
  args: {
    label: 'MinLength',
    helperText: 'Should be overriden by error',
    rules: {
      minLength: { value: 10, message: 'Minimum length is 10 characters' },
    },
  },
};

export const MaxLength = {
  render: Template,
  args: {
    label: 'MaxLength',
    helperText: 'Should be overriden by error',
    rules: {
      maxLength: { value: 5, message: 'Max length is 5 characters' },
    },
  },
};

export const Required = {
  render: Template,

  args: {
    label: 'Required',
    rules: { required: true, maxLength: 5 },
  },
};

export const SingleSelect = {
  render: Template,

  args: {
    label: 'Single Select',
    rules: { required: 'Required' },
    select: true,
    children: [
      <MenuItem key={10} value={10}>
        Ten
      </MenuItem>,
      <MenuItem key={20} value={20}>
        Twenty
      </MenuItem>,
      <MenuItem key={30} value={30}>
        Thirty
      </MenuItem>,
    ],
  },
};

export const MultipleSelect = {
  render: Template,

  args: {
    label: 'Multiple Select',
    rules: { required: 'Required' },
    select: true,
    SelectProps: { multiple: true },
    children: [
      <MenuItem key={10} value={10}>
        Ten
      </MenuItem>,
      <MenuItem key={20} value={20}>
        Twenty
      </MenuItem>,
      <MenuItem key={30} value={30}>
        Thirty
      </MenuItem>,
    ],
  },
};
