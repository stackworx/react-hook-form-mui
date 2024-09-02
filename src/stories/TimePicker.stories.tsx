import Stack from '@mui/material/Stack';
import {Meta, StoryFn} from '@storybook/react';
import {FormProvider, useForm} from 'react-hook-form';

import {TimePicker} from '../../packages/x-date-pickers/src/TimePicker';
import {Form} from './Form';

export default {
  title: 'X-Mui/TimePicker',
  component: TimePicker,
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {onSubmit: {action: 'submit'}},
} as Meta<typeof TimePicker>;

const Template: StoryFn<typeof TimePicker> = (args: any) => {
  const formProps = useForm<{
    picker: any;
  }>({
    defaultValues: {
      picker: null,
    },
  });
  return (
    <FormProvider {...formProps}>
      <Form {...formProps} onSubmit={args.onSubmit}>
        <Stack>
          <TimePicker
            name='picker'
            label='Date Picker'
            rules={{required: true}}
            {...args}
          />
        </Stack>
      </Form>
    </FormProvider>
  );
};

export const Default = {
  render: Template,

  args: {
    label: 'Default',
  },
};
