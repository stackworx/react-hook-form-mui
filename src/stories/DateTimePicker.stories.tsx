import Stack from "@mui/material/Stack";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { useForm } from "react-hook-form";

import { DateTimePicker } from "../../packages/x-date-pickers/src/DateTimePicker";
import { Form } from "./Form";

export default {
  title: "X-Mui/DateTimePicker",
  component: DateTimePicker,
  parameters: {
    layout: "fullscreen",
  },
  argTypes: { onSubmit: { action: "submit" } },
} as ComponentMeta<typeof DateTimePicker>;

const Template: ComponentStory<typeof DateTimePicker> = (args: any) => {
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
        <DateTimePicker
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
