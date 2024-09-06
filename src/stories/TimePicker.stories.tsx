import { Meta } from '@storybook/react';
import { TimePicker } from '../../packages/x-date-pickers/src/TimePicker';
import dayjs from 'dayjs';
import { FormDecorator } from '../decorators/FormDecorator';
import { ComponentProps } from 'react';
import { UseFormProps } from 'react-hook-form/dist/types';

export default {
  title: 'MUI-X/TimePicker',
  decorators: [
    (Story, context) => {
      return (
        <FormDecorator formProps={context.args.form}>
          <Story />
        </FormDecorator>
      );
    },
  ],
  component: TimePicker,
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    name: 'picker',
    form: {
      defaultValues: { picker: dayjs().toDate() },
    },
  },
  argTypes: { onSubmit: { action: 'submit' } },
} as Meta<ComponentProps<typeof TimePicker> & { form: UseFormProps }>;

export const Default = {
  args: {
    label: 'Default',
  },
};

export const Required = {
  args: {
    label: 'Required',
    rules: { required: true, message: 'This fields is required' },
    form: {
      defaultValues: { picker: undefined },
    },
  },
};

export const WithHelperText = {
  args: {
    label: 'With Helper Text',
    rules: { required: 'This field is required' },
    slotProps: {
      textField: {
        helperText: 'Will be replaced with error message...',
      },
    },
  },
};

export const InvalidTime = {
  args: {
    label: 'Invalid Date',
    form: {
      defaultValues: { picker: '25:00' },
    },
  },
};

export const DisablePast = {
  args: {
    form: {
      defaultValues: { picker: dayjs().subtract(1, 'hour').toDate() },
    },
    label: 'Disable Past',
    disablePast: true,
  },
};

export const DisableFuture = {
  args: {
    form: {
      defaultValues: { picker: dayjs().add(1, 'hour').toDate() },
    },
    label: 'Disable Future',
    disableFuture: true,
  },
};

export const MaxTime = {
  args: {
    label: 'Max Time',
    maxTime: dayjs().subtract(1, 'hour').toDate(),
  },
};

export const MinTime = {
  args: {
    label: 'Max Time',
    minTime: dayjs().add(1, 'hour').toDate(),
  },
};

export const MinutesStep = {
  args: {
    label: 'Minutes Step',
    minutesStep: '15',
  },
};

export const ShouldDisableTimeHours = {
  args: {
    label: 'Should Disable Time Hours (5AM not allowed)',
    form: {
      defaultValues: { picker: dayjs().hour(5).minute(0).second(0).toDate() },
    },
    shouldDisableTime: (timeParam) => {
      const disabledHour = 5;
      const selectedHour = dayjs(timeParam).hour();

      return selectedHour === disabledHour;
    },
  },
};

export const ShouldDisableTimeMinutes = {
  args: {
    label: 'Should Disable Time Minutes (Half hour not allowed)',
    form: {
      defaultValues: { picker: dayjs().hour(5).minute(30).second(0).toDate() },
    },
    shouldDisableTime: (timeParam) => {
      const disabledMinute = 30;
      const selectedMinute = dayjs(timeParam).minute();

      return selectedMinute === disabledMinute;
    },
  },
};

export const ShouldDisableTimeSeconds = {
  args: {
    label: 'Should Disable Time Seconds (45 seconds not allowed)',
    // defaultValue: dayjs().minute(0).second(45).toDate(),
    form: {
      defaultValues: { picker: dayjs().minute(0).second(45).toDate() },
    },
    views: ['year', 'day', 'hours', 'minutes', 'seconds'],
    shouldDisableTime: (timeParam) => {
      const disabledSecond = 45;
      const selectedSecond = dayjs(timeParam).second();

      return selectedSecond === disabledSecond;
    },
  },
};
