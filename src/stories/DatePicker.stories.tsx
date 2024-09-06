import { Meta } from '@storybook/react';
import { DatePicker } from '../../packages/x-date-pickers/src/DatePicker';
import dayjs from 'dayjs';
import { FormDecorator } from '../decorators/FormDecorator';
import { ComponentProps } from 'react';
import { UseFormProps } from 'react-hook-form/dist/types';

export default {
  title: 'MUI-X/DatePicker',
  decorators: [
    (Story, context) => {
      return (
        <FormDecorator formProps={context.args.form}>
          <Story />
        </FormDecorator>
      );
    },
  ],
  component: DatePicker,
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
} as Meta<ComponentProps<typeof DatePicker> & { form: UseFormProps }>;

export const Default = {
  args: {
    label: 'Default',
  },
};

export const Required = {
  args: {
    label: 'Required',
    rules: { required: true, message: 'This fields is required' },
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

export const InvalidDate = {
  args: {
    label: 'Invalid Date',
    form: {
      defaultValues: { picker: '2024-66-81' },
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

export const ShouldDisableDate = {
  args: {
    label: 'Should Disable Date',
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
    form: { defaultValues: { picker: dayjs().add(1, 'month').toDate() } },
    shouldDisableMonth: (dateParam) => {
      const month = dayjs().add(1, 'month').startOf('month');
      const selectedMonth = dayjs(dateParam).startOf('month');

      return selectedMonth.isSame(month);
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
