import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';
import {Meta, StoryFn} from '@storybook/react';
import {useForm} from 'react-hook-form';

import {Select} from '../../packages/mui/src/Select';
import {Form} from './Form';

export default {
  title: 'Core/Select',
  component: Select,
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {onSubmit: {action: 'submit'}},
} as Meta<typeof Select>;

const Template: StoryFn<typeof Select> = (args: any) => {
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
        <Select
          name='text'
          label='Text'
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

export const Required = {
  render: Template,

  args: {
    label: 'Required',
    rules: {required: 'Required'},
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

export const SingleSelect = {
  render: Template,

  args: {
    label: 'Single Select',
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
    SelectProps: {multiple: true},
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
