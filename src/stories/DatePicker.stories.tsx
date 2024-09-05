import Stack from '@mui/material/Stack';
import { StoryFn, Meta } from '@storybook/react';
import { useForm, FormProvider } from 'react-hook-form';
import { DatePicker } from '../../packages/x-date-pickers/src/DatePicker';
import { Form } from './Form';
import React from 'react';
import dayjs from 'dayjs';

export default {
  title: 'X-Mui/DatePicker',
  component: DatePicker,
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: { onSubmit: { action: 'submit' } },
} as Meta<typeof DatePicker>;

const Template: StoryFn<typeof DatePicker> = (args: any) => {
  const formProps = useForm<{
    picker: any;
  }>({
    defaultValues: {
      picker: args.defaultValue || null,
    },
  });
  return (
    <FormProvider {...formProps}>
      <Form {...formProps} onSubmit={args.onSubmit}>
        <Stack>
          <DatePicker name="picker" label="Date Picker" {...args} />
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

export const required = {
  render: Template,

  args: {
    label: 'Required',
    rules: { required: true, message: 'This fields is required' },
  },
};

export const InvalidDate = {
  render: Template,

  args: {
    label: 'Invalid Date',
    slotProps: {
      textField: {
        helperText: 'Start typing to show error...',
      },
    },
  },
};

export const DisableFuture = {
  render: Template,

  args: {
    defaultValue: dayjs().add(1, 'day').toDate(),
    label: 'Disable Future',
    disableFuture: true,
  },
};

export const DisablePast = {
  render: Template,

  args: {
    defaultValue: dayjs().subtract(1, 'day').toDate(),
    label: 'Disable Past',
    disablePast: true,
  },
};

export const MaxDate = {
  render: Template,

  args: {
    defaultValue: dayjs().add(2, 'day').toDate(),
    label: 'Max Date',
    maxDate: dayjs().add(1, 'day').toDate(),
  },
};

export const MinDate = {
  render: Template,

  args: {
    defaultValue: dayjs().subtract(2, 'day').toDate(),
    label: 'Min Date',
    minDate: dayjs().subtract(1, 'day').toDate(),
  },
};

export const ShouldDisableMonth = {
  render: Template,

  args: {
    label: 'Should Disable Month',
    defaultValue: dayjs().add(1, 'month').toDate(),
    shouldDisableDate: (dateParam) => {
      const month = dayjs().add(1, 'month').startOf('month');
      const selectedMonth = dayjs(dateParam).startOf('month');

      return selectedMonth.isSame(month);
    },
  },
};

export const ShouldDisableDate = {
  render: Template,

  args: {
    label: 'Should Disable Date',
    defaultValue: dayjs().add(1, 'day').toDate(),
    shouldDisableDate: (dateParam) => {
      const tomorrow = dayjs().add(1, 'day').startOf('day');
      const selectedDate = dayjs(dateParam).startOf('day');

      return selectedDate.isSame(tomorrow);
    },
  },
};

export const ShouldDisableYear = {
  render: Template,

  args: {
    label: 'Should Disable Year',
    defaultValue: dayjs().year(2025).month(0).date(1).toDate(),
    shouldDisableDate: (dateParam) => {
      const disabledYear = 2025;
      const selectedYear = dayjs(dateParam).year();

      return selectedYear === disabledYear;
    },
  },
};
