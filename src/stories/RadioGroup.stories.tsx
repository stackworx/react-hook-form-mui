import { StoryFn, Meta } from "@storybook/react";
import { useForm } from "react-hook-form";

import { RadioGroup } from "../../packages/mui/src/RadioGroup";
import { Form } from "./Form";
import { FormControl, FormControlLabel, FormLabel, Radio } from "@mui/material";

export default {
  title: "Core/RadioGroup",
  component: RadioGroup,
  parameters: {
    layout: "fullscreen",
  },
  argTypes: { onSubmit: { action: "submit" } },
} as Meta<typeof RadioGroup>;

const Template: StoryFn<typeof RadioGroup> = (args: any) => {
  const formProps = useForm<{
    radioGroup: any;
  }>({
    defaultValues: {
      radioGroup: false,
    },
  });
  return (
    <Form {...formProps} onSubmit={args.onSubmit}>
      <FormControl>
        <FormLabel id="demo-radio-buttons-group-label" error>
          Gender
        </FormLabel>
        <RadioGroup
          name="radioGroup"
          control={formProps.control}
          errors={formProps.formState.errors}
          {...args}
        >
          <FormControlLabel
            value="female"
            control={<Radio required={true} />}
            label="Female"
          />
          <FormControlLabel
            value="male"
            control={<Radio required={true} />}
            label="Male"
          />
          <FormControlLabel
            value="other"
            control={<Radio required={true} />}
            label="Other"
          />
        </RadioGroup>
      </FormControl>
    </Form>
  );
};

export const Default = {
  render: Template,
};

export const Required = {
  render: Template,

  args: {
    rules: { required: "This field is required" },
  },
};
