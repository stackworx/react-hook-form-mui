import { ComponentStory, ComponentMeta } from "@storybook/react";
import { useForm } from "react-hook-form";

import { CheckboxGroup } from "../CheckboxGroup";
import { Form } from "./Form";

export default {
  title: "Core/CheckboxGroup",
  component: CheckboxGroup,
  parameters: {
    layout: "fullscreen",
  },
  argTypes: { onSubmit: { action: "submit" } },
} as ComponentMeta<typeof CheckboxGroup>;

const Template: ComponentStory<typeof CheckboxGroup> = (args: any) => {
  const formProps = useForm<{
    colours: any;
  }>({
    defaultValues: {
      colours: [],
    },
  });
  return (
    <Form {...formProps} onSubmit={args.onSubmit}>
      <CheckboxGroup
        name="colours"
        label="Red"
        value="red"
        control={formProps.control}
        errors={formProps.formState.errors}
        {...args}
      />
      <CheckboxGroup
        name="colours"
        label="Green"
        value="green"
        control={formProps.control}
        errors={formProps.formState.errors}
        {...args}
      />
      <CheckboxGroup
        name="colours"
        label="Blue"
        value="blue"
        control={formProps.control}
        errors={formProps.formState.errors}
        {...args}
      />
    </Form>
  );
};

export const Default = Template.bind({});
