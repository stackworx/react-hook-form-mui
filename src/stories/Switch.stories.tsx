import Stack from "@mui/material/Stack";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { useForm } from "react-hook-form";

import { Switch } from "../Switch";
import { Form } from "./Form";

export default {
  title: "Core/Switch",
  component: Switch,
  parameters: {
    layout: "fullscreen",
  },
  argTypes: { onSubmit: { action: "submit" } },
} as ComponentMeta<typeof Switch>;

const Template: ComponentStory<typeof Switch> = (args: any) => {
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
        name="switch"
        label="Text"
        control={formProps.control}
        errors={formProps.formState.errors}
        {...args}
      />
    </Form>
  );
};

export const Default = Template.bind({});

export const Required = Template.bind({});
Required.args = {
  rules: { required: "Required" },
};
