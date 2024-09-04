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

export const required = {
  render: Template,

  args: {
    label: 'Required',
    rules: { required: true },
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
  },
};

export const DisableFuture = {
  render: Template,

  args: {
    label: 'Disable Future',
  },
};

export const MaxDate = {
  render: Template,

  args: {
    label: 'Max Date',
  },
};

export const MinDate = {
  render: Template,

  args: {
    label: 'Min Date',
  },
};

export const MaxDateTime = {
  render: Template,

  args: {
    label: 'Max Date Time',
  },
};

export const MinDateTime = {
  render: Template,

  args: {
    label: 'Min Date Time',
  },
};

export const ShouldDisableDate = {
  render: Template,

  args: {
    label: 'Should Disable Date',
  },
};

export const MaxTime = {
  render: Template,

  args: {
    label: 'Max Time',
  },
};

export const MinutesStep = {
  render: Template,

  args: {
    label: 'Minutes Step',
  },
};

export const ShouldDisableMonth = {
  render: Template,

  args: {
    label: 'Should Disable Month',
  },
};

export const ShouldDisableTimeHours = {
  render: Template,

  args: {
    label: 'Should Disable Time Hours',
  },
};

export const ShouldDisableTimeMinutes = {
  render: Template,

  args: {
    label: 'Should Disable Time Minutes',
  },
};

export const ShouldDisableTimeSeconds = {
  render: Template,

  args: {
    label: 'Should Disable Time Seconds',
  },
};

export const ShouldDisableYear = {
  render: Template,

  args: {
    label: 'Should Disable Year',
  },
};
