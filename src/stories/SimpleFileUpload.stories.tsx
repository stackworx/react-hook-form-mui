import Stack from '@mui/material/Stack';
import { StoryFn, Meta } from '@storybook/react';
import { useForm } from 'react-hook-form';

import { SimpleFileUpload } from '../../packages/mui/src/SimpleFileUpload';
import { Form } from './Form';

export default {
  title: 'Core/SimpleFileUpload',
  component: SimpleFileUpload,
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: { onSubmit: { action: 'submit' } },
} as Meta<typeof SimpleFileUpload>;

const Template: StoryFn<typeof SimpleFileUpload> = (args: any) => {
  const formProps = useForm<{
    file: File | null;
  }>({
    defaultValues: {
      file: null,
    },
  });

  return (
    <Form {...formProps} onSubmit={args.onSubmit}>
      <Stack>
        <SimpleFileUpload
          name="file"
          label="File Upload"
          control={formProps.control}
          rules={args.rules}
          accept={args.accept}
          disabled={args.disabled}
          {...args}
        />
      </Stack>
    </Form>
  );
};

export const Default = {
  render: Template,
  args: {
    label: 'Default',
    accept: 'image/*',
  },
};

export const Required = {
  render: Template,
  args: {
    label: 'Required',
    accept: 'image/*',
    rules: { required: 'File is required' },
  },
};

export const Disabled = {
  render: Template,
  args: {
    label: 'Disabled',
    accept: 'image/*',
    disabled: true,
  },
};

export const AcceptPDF = {
  render: Template,
  args: {
    label: 'Accept PDF',
    accept: 'application/pdf',
  },
};
