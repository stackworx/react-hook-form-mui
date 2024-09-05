import Stack from '@mui/material/Stack';
import { Meta, StoryFn } from '@storybook/react';
import { FormProvider, useForm } from 'react-hook-form';
import { TimePicker } from '../../packages/x-date-pickers/src/TimePicker';
import { Form } from './Form';
import dayjs from 'dayjs';

export default {
  title: 'MUI-X/TimePicker',
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
      picker: args.defaultValue || null,
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
    defaultValue: dayjs().subtract(1, 'day').toDate(),
    label: 'Disable Past',
    disablePast: true,
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

export const MaxTime = {
  render: Template,

  args: {
    defaultValue: dayjs().set('hour', 6).startOf('hour').toDate(),
    label: 'Max Time',
    maxTime: dayjs().set('hour', 5).startOf('hour').toDate(),
  },
};

export const MinTime = {
  render: Template,

  args: {
    defaultValue: dayjs().set('hour', 2).startOf('hour').toDate(),
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
    defaultValue: dayjs().hour(5).minute(0).second(0).toDate(),
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
    defaultValue: dayjs().minute(30).second(0).toDate(),
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
    defaultValue: dayjs().minute(0).second(45).toDate(),
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
