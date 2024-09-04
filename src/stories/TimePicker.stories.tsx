import Stack from '@mui/material/Stack';
import { StoryFn, Meta } from '@storybook/react';
import { useForm, FormProvider } from 'react-hook-form';
import { TimePicker } from '../../packages/x-date-pickers/src/TimePicker';
import { Form } from './Form';
import React from 'react';
import dayjs from 'dayjs';

export default {
  title: 'X-Mui/TimePicker',
  component: TimePicker,
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: { onSubmit: { action: 'submit' } },
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
          <TimePicker name="picker" label="Time Picker" {...args} />
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
