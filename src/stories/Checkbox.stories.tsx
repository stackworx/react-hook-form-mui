import { ComponentStory, ComponentMeta } from "@storybook/react";
import { useForm } from "react-hook-form";

import { Checkbox } from "../Checkbox";
import { Form } from "./Form";

export default {
  title: "Core/Checkbox",
  component: Checkbox,
  parameters: {
    layout: "fullscreen",
  },
  argTypes: { onSubmit: { action: "submit" } },
} as ComponentMeta<typeof Checkbox>;

const Template: ComponentStory<typeof Checkbox> = (args: any) => {
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
