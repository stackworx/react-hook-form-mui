import Stack from "@mui/material/Stack";
import MenuItem from "@mui/material/MenuItem";
import { StoryFn, Meta } from "@storybook/react";
// import { within, userEvent } from "@storybook/testing-library";
import { useForm } from "react-hook-form";

import { Select } from "../../packages/mui/src/Select";
import { Form } from "./Form";

export default {
  title: "Core/Select",
  component: Select,
  parameters: {
    layout: "fullscreen",
  },
  argTypes: { onSubmit: { action: "submit" } },
} as Meta<typeof Select>;

const Template: StoryFn<typeof Select> = (args: any) => {
  const formProps = useForm<{
    text: any;
  }>({
    defaultValues: {
      text: args?.multiple ? [] : "",
    },
  });
  return (
    <Form {...formProps} onSubmit={args.onSubmit}>
      <Stack>
        <Select
          name="text"
          label="Text"
          control={formProps.control}
          errors={formProps.formState.errors}
          {...args}
        />
      </Stack>
    </Form>
  );
};

export const SingleSelect = {
  render: Template,

  args: {
    label: "Single Select",
    rules: { required: "Required" },
    children: [
      <MenuItem key={10} value={10}>
        Ten
      </MenuItem>,
      <MenuItem key={20} value={20}>
        Twenty
      </MenuItem>,
      <MenuItem key={30} value={30}>
        Thirty
      </MenuItem>,
    ],
  },
};

export const MultipleSelect = {
  render: Template,

  args: {
    label: "Multiple Select",
    rules: { required: "Required" },
    multiple: true,
    children: [
      <MenuItem key={10} value={10}>
        Ten
      </MenuItem>,
      <MenuItem key={20} value={20}>
        Twenty
      </MenuItem>,
      <MenuItem key={30} value={30}>
        Thirty
      </MenuItem>,
    ],
  },
};
