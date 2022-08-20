import { ComponentStory, ComponentMeta } from "@storybook/react";
import { useForm } from "react-hook-form";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";

import { CheckboxGroup } from "../../packages/mui/src/CheckboxGroup";
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
      <FormGroup>
        <FormControlLabel
          control={
            <CheckboxGroup
              name="colours"
              value="red"
              control={formProps.control}
              errors={formProps.formState.errors}
              {...args}
            />
          }
          label="Red"
        ></FormControlLabel>
      </FormGroup>
      <FormGroup>
        <FormControlLabel
          control={
            <CheckboxGroup
              name="colours"
              value="green"
              control={formProps.control}
              errors={formProps.formState.errors}
              {...args}
            />
          }
          label="Green"
        ></FormControlLabel>
      </FormGroup>
      <FormGroup>
        <FormControlLabel
          control={
            <CheckboxGroup
              name="colours"
              value="blue"
              control={formProps.control}
              errors={formProps.formState.errors}
              {...args}
            />
          }
          label="Blue"
        ></FormControlLabel>
      </FormGroup>
    </Form>
  );
};

export const Default = Template.bind({});
