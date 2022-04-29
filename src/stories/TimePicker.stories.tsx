import Stack from "@mui/material/Stack";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { useForm } from "react-hook-form";

import { TimePicker } from "../../packages/x-date-pickers/src/TimePicker";
import { Form } from "./Form";

export default {
  title: "X-Mui/TimePicker",
  component: TimePicker,
  parameters: {
    layout: "fullscreen",
  },
  argTypes: { onSubmit: { action: "submit" } },
} as ComponentMeta<typeof TimePicker>;

const Template: ComponentStory<typeof TimePicker> = (args: any) => {
  const formProps = useForm<{
    picker: any;
  }>({
    defaultValues: {
      picker: null,
    },
  });
  return (
    <Form {...formProps} onSubmit={args.onSubmit}>
      <Stack>
        <TimePicker
          name="picker"
          label="Date Picker"
          setError={formProps.setError}
          clearErrors={formProps.clearErrors}
          control={formProps.control}
          errors={formProps.formState.errors}
          rules={{ required: true }}
          {...args}
        />
      </Stack>
    </Form>
  );
};

export const Default = Template.bind({});
Default.args = {
  label: "Default",
};
