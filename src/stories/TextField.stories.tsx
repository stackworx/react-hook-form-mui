import Stack from "@mui/material/Stack";
import MenuItem from "@mui/material/MenuItem";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { useForm } from "react-hook-form";

import { TextField } from "../TextField";
import { Form } from "./Form";

export default {
  title: "Core/TextField",
  component: TextField,
  parameters: {
    layout: "fullscreen",
  },
  argTypes: { onSubmit: { action: "submit" } },
} as ComponentMeta<typeof TextField>;

const Template: ComponentStory<typeof TextField> = (args: any) => {
  const formProps = useForm<{
    text: any;
  }>({
    defaultValues: {
      text: args.SelectProps?.multiple ? [] : "",
    },
  });
  return (
    <Form {...formProps} onSubmit={args.onSubmit}>
      <Stack>
        <TextField
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

export const Default = Template.bind({});
Default.args = {
  label: "Default",
};

export const Required = Template.bind({});
Required.args = {
  label: "Required",
  rules: { required: "Required" },
};

export const SingleSelect = Template.bind({});
SingleSelect.args = {
  label: "Single Select",
  rules: { required: "Required" },
  select: true,
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
};

export const MultipleSelect = Template.bind({});
MultipleSelect.args = {
  label: "Multiple Select",
  rules: { required: "Required" },
  select: true,
  SelectProps: { multiple: true },
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
};
