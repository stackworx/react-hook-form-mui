import Stack from "@mui/material/Stack";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { useForm } from "react-hook-form";

import { DatePicker } from "../../packages/x-date-pickers/src/DatePicker";
import { Form } from "./Form";

export default {
  title: "X-Mui/DatePicker",
  component: DatePicker,
  parameters: {
    layout: "fullscreen",
  },
  argTypes: { onSubmit: { action: "submit" } },
} as ComponentMeta<typeof DatePicker>;

const Template: ComponentStory<typeof DatePicker> = (args: any) => {
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
        <DatePicker
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
