import { Path, RegisterOptions, UseFormRegister } from "react-hook-form";
import MuiTextField, {
  TextFieldProps as MuiTextFieldProps,
} from "@mui/material/TextField";

export interface TextFieldProps<TFieldValues>
  extends Omit<MuiTextFieldProps, "value"> {
  name: Path<TFieldValues>;
  rules?: RegisterOptions;
  register?: UseFormRegister<TFieldValues>;
  // TODO: errors
}

export function TextField<TFieldValues>(props: TextFieldProps<TFieldValues>) {
  return <></>;
}
