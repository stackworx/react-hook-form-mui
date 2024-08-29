import Stack from '@mui/material/Stack';
import { StoryFn, Meta } from '@storybook/react';
import { useForm, FormProvider } from 'react-hook-form';

import { DateTimePicker } from '../../packages/x-date-pickers/src/DateTimePicker';
import { Form } from './Form';

export default {
  title: 'X-Mui/DateTimePicker',
  component: DateTimePicker,
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: { onSubmit: { action: 'submit' } },
} as Meta<typeof DateTimePicker>;

const Template: StoryFn<typeof DateTimePicker> = (args: any) => {
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
          <DateTimePicker name="picker" label="Date Picker" {...args} />
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
