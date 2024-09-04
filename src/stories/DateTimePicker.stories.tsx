import Stack from '@mui/material/Stack';
import { StoryFn, Meta } from '@storybook/react';
import { useForm, FormProvider } from 'react-hook-form';
import { DateTimePicker } from '../../packages/x-date-pickers/src/DateTimePicker';
import { Form } from './Form';
import React from 'react';
import dayjs from 'dayjs';

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

export const DisablePast = {
  render: Template,

  args: {
    label: 'Disable Past',
    disablePast: true,
  },
};

export const DisableFuture = {
  render: Template,

  args: {
    label: 'Disable Future',
    disableFuture: true,
  },
};

export const MaxDate = {
  render: Template,

  args: {
    label: 'Max Date',
    maxDate: dayjs().add(1, 'day').toDate(),
  },
};

export const MinDate = {
  render: Template,

  args: {
    label: 'Min Date',
    minDate: dayjs().subtract(1, 'day').toDate(),
  },
};

export const MaxDateTime = {
  render: Template,

  args: {
    label: 'Max Date Time',
    maxDateTime: dayjs().set('hour', 15).startOf('hour').toDate(),
  },
};

export const MinDateTime = {
  render: Template,

  args: {
    label: 'Min Date Time',
    minDateTime: dayjs().set('hour', 15).startOf('hour').toDate(),
  },
};

export const MaxTime = {
  render: Template,

  args: {
    label: 'Max Time',
    maxTime: dayjs().set('hour', 9).startOf('hour').toDate(),
  },
};

export const MinTime = {
  render: Template,

  args: {
    label: 'Max Time',
    minTime: dayjs().set('hour', 3).startOf('hour').toDate(),
  },
};

export const MinutesStep = {
  render: Template,

  args: {
    label: 'Minutes Step',
    minutesStep: '15',
  },
};

export const ShouldDisableDate = {
  render: Template,

  args: {
    label: 'Should Disable Date',
    shouldDisableDate: (dateParam) => {
      const tomorrow = dayjs().add(1, 'day').startOf('day');
      const selectedDate = dayjs(dateParam).startOf('day');

      return selectedDate.isSame(tomorrow);
    },
  },
};

export const ShouldDisableMonth = {
  render: Template,

  args: {
    label: 'Should Disable Month',
    shouldDisableDate: (dateParam) => {
      const month = dayjs().add(1, 'month').startOf('month');
      const selectedMonth = dayjs(dateParam).startOf('month');

      return selectedMonth.isSame(month);
    },
  },
};

export const ShouldDisableTimeHours = {
  render: Template,

  args: {
    label: 'Should Disable Time Hours',
    shouldDisableTime: (timeParam) => {
      const disabledHour = 5;
      const selectedHour = dayjs(timeParam).hour();

      return selectedHour === disabledHour;
    },
  },
};

export const ShouldDisableTimeMinutes = {
  render: Template,
  args: {
    label: 'Should Disable Time Minutes',
    shouldDisableTime: (timeParam) => {
      const disabledMinute = 30;
      const selectedMinute = dayjs(timeParam).minute();

      return selectedMinute === disabledMinute;
    },
  },
};

export const ShouldDisableTimeSeconds = {
  render: Template,

  args: {
    label: 'Should Disable Time Seconds',
    // Views are used to showcase all the picker options that can be changed
    // added seconds to picker
    views: ['year', 'day', 'hours', 'minutes', 'seconds'],

    shouldDisableTime: (timeParam) => {
      const disabledSecond = 45;
      const selectedSecond = dayjs(timeParam).second();

      return selectedSecond === disabledSecond;
    },
  },
};

export const ShouldDisableYear = {
  render: Template,

  args: {
    label: 'Should Disable Year',
    shouldDisableDate: (dateParam) => {
      const disabledYear = 2025;
      const selectedYear = dayjs(dateParam).year();

      return selectedYear === disabledYear;
    },
  },
};
