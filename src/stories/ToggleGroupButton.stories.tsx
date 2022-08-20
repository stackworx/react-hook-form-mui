import { ComponentStory, ComponentMeta } from "@storybook/react";
import { useForm } from "react-hook-form";
import FormatAlignLeftIcon from "@mui/icons-material/FormatAlignLeft";
import FormatAlignCenterIcon from "@mui/icons-material/FormatAlignCenter";
import FormatAlignRightIcon from "@mui/icons-material/FormatAlignRight";
import FormatAlignJustifyIcon from "@mui/icons-material/FormatAlignJustify";
import ToggleButton from "@mui/material/ToggleButton";

import { ToggleButtonGroup } from "../../packages/mui/src/ToggleButtonGroup";
import { Form } from "./Form";

export default {
  title: "Core/ToggleButtonGroup",
  component: ToggleButtonGroup,
  parameters: {
    layout: "fullscreen",
  },
  argTypes: { onSubmit: { action: "submit" } },
} as ComponentMeta<typeof ToggleButtonGroup>;

const Template: ComponentStory<typeof ToggleButtonGroup> = (args: any) => {
  const formProps = useForm<{
    alignment: any;
  }>({
    defaultValues: {
      alignment: [],
    },
  });
  return (
    <Form {...formProps} onSubmit={args.onSubmit}>
      <ToggleButtonGroup
        name="alignment"
        value="red"
        control={formProps.control}
        setValue={formProps.setValue}
        {...args}
      >
        <ToggleButton value="left" aria-label="left aligned">
          <FormatAlignLeftIcon />
        </ToggleButton>
        <ToggleButton value="center" aria-label="centered">
          <FormatAlignCenterIcon />
        </ToggleButton>
        <ToggleButton value="right" aria-label="right aligned">
          <FormatAlignRightIcon />
        </ToggleButton>
        <ToggleButton value="justify" aria-label="justified" disabled>
          <FormatAlignJustifyIcon />
        </ToggleButton>
      </ToggleButtonGroup>
    </Form>
  );
};

export const Default = Template.bind({});
