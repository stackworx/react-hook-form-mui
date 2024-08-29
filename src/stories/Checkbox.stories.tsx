import { StoryFn, Meta } from "@storybook/react";
import { useForm } from "react-hook-form";

import { Checkbox } from "../../packages/mui/src/Checkbox";
import { CheckboxWithLabel } from "../../packages/mui/src/CheckboxWithLabel";
import { Form } from "./Form";

export default {
  title: "Core/Checkbox",
  component: Checkbox,
  parameters: {
    layout: "fullscreen",
  },
  argTypes: { onSubmit: { action: "submit" } },
} as Meta<typeof Checkbox>;

const WithFormControlLabel: StoryFn<typeof Checkbox> = (args: any) => {
  const formProps = useForm<{
    checkbox: any;
  }>({
    defaultValues: {
      checkbox: false,
    },
  });
  return (
    <Form {...formProps} onSubmit={args.onSubmit}>
      <CheckboxWithLabel
        name="checkbox"
        label="checkbox"
        control={formProps.control}
        errors={formProps.formState.errors}
        {...args}
      />
    </Form>
  );
};

const Template: StoryFn<typeof Checkbox> = (args: any) => {
  const formProps = useForm<{
    checkbox: any;
  }>({
    defaultValues: {
      checkbox: false,
    },
  });
  return (
    <Form {...formProps} onSubmit={args.onSubmit}>
      <Checkbox
        name="checkbox"
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
    rules: { required: "Required" },
  },
};

export const WithFormLabel = {
  render: WithFormControlLabel,
  args: {
    rules: { required: "Required" },
  },
};
