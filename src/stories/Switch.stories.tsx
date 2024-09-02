import {Meta, StoryFn} from '@storybook/react';
import {useForm} from 'react-hook-form';

import {Switch} from '../../packages/mui/src/Switch';
import {Form} from './Form';

export default {
  title: 'Core/Switch',
  component: Switch,
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {onSubmit: {action: 'submit'}},
} as Meta<typeof Switch>;

const Template: StoryFn<typeof Switch> = (args: any) => {
  const formProps = useForm<{
    switch: any;
  }>({
    defaultValues: {
      switch: false,
    },
  });
  return (
    <Form {...formProps} onSubmit={args.onSubmit}>
      <Switch
        name='switch'
        label='Text'
        control={formProps.control}
        errors={formProps.formState.errors}
        {...args}
      />
    </Form>
  );
};

export const Default = {
  render: Template,
};

export const Required = {
  render: Template,

  args: {
    rules: {required: 'Required'},
  },
};
