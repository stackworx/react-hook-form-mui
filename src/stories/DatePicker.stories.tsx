import Stack from '@mui/material/Stack';
import {Meta, StoryFn} from '@storybook/react';
import {FormProvider, useForm} from 'react-hook-form';

import {DatePicker} from '../../packages/x-date-pickers/src/DatePicker';
import {Form} from './Form';

export default {
  title: 'X-Mui/DatePicker',
  component: DatePicker,
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {onSubmit: {action: 'submit'}},
} as Meta<typeof DatePicker>;

const Template: StoryFn<typeof DatePicker> = (args: any) => {
  const formProps = useForm<{
    picker: any;
  }>({
    defaultValues: {
      picker: '08/24/2022',
    },
  });
  return (
    <FormProvider {...formProps}>
      <Form {...formProps} onSubmit={args.onSubmit}>
        <Stack>
          <DatePicker
            name='picker'
            label='Date Picker'
            rules={{required: true}}
            disablePast={true}
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
