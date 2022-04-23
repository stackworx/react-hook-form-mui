import * as React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { within, userEvent } from "@storybook/testing-library";
import { useForm } from "react-hook-form";

import { TextField } from "../TextField";
import { Form } from "./Form";

export default {
  title: "TextField",
  component: TextField,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen",
  },
} as ComponentMeta<typeof TextField>;

interface Values {
  text: string;
}

const Template: ComponentStory<typeof TextField> = (args) => {
  console.log(args);
  const { register, handleSubmit, formState } = useForm<Values>();
  return (
    <Form formState={formState} handleSubmit={handleSubmit}>
      <TextField name="text" label="Text" register={register} />
    </Form>
  );
};

export const LoggedOut = Template.bind({});

export const LoggedIn = Template.bind({});
