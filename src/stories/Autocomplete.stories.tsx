import { ComponentStory, ComponentMeta } from "@storybook/react";
import { useForm } from "react-hook-form";
import { AutocompleteRenderInputParams, TextField } from "@mui/material";

import { Autocomplete } from "../../packages/mui/src/Autocomplete";
import { Form } from "./Form";
import { Movie, top100Films } from "./data";

export default {
  title: "Core/Autocomplete",
  component: Autocomplete,
  parameters: {
    layout: "fullscreen",
  },
  argTypes: { onSubmit: { action: "submit" } },
} as ComponentMeta<typeof Autocomplete>;

const Template: ComponentStory<typeof Autocomplete> = (args: any) => {
  const formProps = useForm<{
    autocomplete: any;
  }>({
    defaultValues: {
      autocomplete: args.multiple ? [] : top100Films[0],
    },
  });
  const {
    formState: { touchedFields, errors },
  } = formProps;
  return (
    <Form {...formProps} onSubmit={args.onSubmit}>
      <Autocomplete
        name="autocomplete"
        label="Autocoplete"
        options={top100Films}
        getOptionLabel={(option: Movie) => option.title}
        style={{ width: 300 }}
        control={formProps.control}
        errors={formProps.formState.errors}
        renderInput={(params: AutocompleteRenderInputParams) => (
          <TextField
            {...params}
            name="single"
            error={touchedFields["autocomplete"] && !!errors["autocomplete"]}
            helperText={
              touchedFields["autocomplete"] && errors["autocomplete"]?.message
            }
            label="Single"
            variant="outlined"
          />
        )}
        {...args}
      />
    </Form>
  );
};

export const Default = Template.bind({});

export const Multiple = Template.bind({});
Multiple.args = { multiple: true };
// Required.args = {
//   rules: { required: "Required" },
// };
