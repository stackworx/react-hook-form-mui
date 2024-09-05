import { Meta } from '@storybook/react';
import { DateTimePicker } from '../../packages/x-date-pickers/src/DateTimePicker';
import dayjs from 'dayjs';
import { FormDecorator } from '../decorators/FormDecorator';
import { UseFormProps } from 'react-hook-form/dist/types';
import { ComponentProps } from 'react';

export default {
  title: 'MUI-X/DateTimePicker',
  decorators: [
    (Story, context) => {
      return (
        <FormDecorator formProps={context.args.form}>
          <Story />
        </FormDecorator>
      );
    },
  ],
  component: DateTimePicker,
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    name: 'picker',
    form: {
      defaultValues: { picker: dayjs().toDate() },
    },
  },
  actions: {
    onSubmit: 'submit',
  },
  argTypes: { onSubmit: { action: 'submit' } },
} as Meta<ComponentProps<typeof DateTimePicker> & { form: UseFormProps }>;

export const Default = {
  args: {
    label: 'Default',
  },
};

export const Required = {
  args: {
    label: 'Required',
    rules: { required: true },
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

//
export const InvalidDate = {
  args: {
    label: 'Invalid Date',
    form: {
      defaultValues: { picker: '2025' },
    },
  },
};

export const DisablePast = {
  args: {
    form: {
      defaultValues: { picker: dayjs().subtract(1, 'day').toDate() },
    },
    label: 'Disable Past',
    disablePast: true,
  },
};

export const DisableFuture = {
  args: {
    form: {
      defaultValues: { picker: dayjs().add(1, 'day').toDate() },
    },
    label: 'Disable Future',
    disableFuture: true,
  },
};

export const MaxDate = {
  args: {
    label: 'Max Date',
    maxDate: dayjs().subtract(1, 'day').toDate(),
  },
};
export const MinDate = {
  args: {
    label: 'Min Date',
    minDate: dayjs().add(1, 'day').toDate(),
  },
};

export const MaxDateTime = {
  args: {
    label: 'Max Date Time',
    maxDateTime: dayjs().subtract(1, 'hour').toDate(),
  },
};

export const MinDateTime = {
  args: {
    label: 'Min Date Time',
    minDateTime: dayjs().add(1, 'hour').toDate(),
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

export const ShouldDisableDate = {
  args: {
    label: 'Should Disable Date - (Tomorrow not allowed)',
    form: { defaultValues: { picker: dayjs().add(1, 'day').toDate() } },
    shouldDisableDate: (dateParam) => {
      const tomorrow = dayjs().add(1, 'day').startOf('day');
      const selectedDate = dayjs(dateParam).startOf('day');

      return selectedDate.isSame(tomorrow);
    },
  },
};

export const ShouldDisableMonth = {
  args: {
    label: 'Should Disable Month (Next month not allowed)',
    // defaultValue: dayjs().add(1, 'month').toDate(),
    form: { defaultValues: { picker: dayjs().add(1, 'month').toDate() } },
    shouldDisableMonth: (dateParam) => {
      const month = dayjs().add(1, 'month').startOf('month');
      const selectedMonth = dayjs(dateParam).startOf('month');

      return selectedMonth.isSame(month);
    },
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
//
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

export const ShouldDisableYear = {
  args: {
    label: 'Should Disable Year (2025 not allowed)',
    // defaultValue: dayjs().year(2025).month(0).date(1).toDate(),
    form: {
      defaultValues: { picker: dayjs().year(2025).month(0).date(1).toDate() },
    },
    shouldDisableYear: (dateParam) => {
      const disabledYear = 2025;
      const selectedYear = dayjs(dateParam).year();

      return selectedYear === disabledYear;
    },
  },
};
