import { jsx as _jsx } from "react/jsx-runtime";
import { useController, } from "react-hook-form";
import MuiTextField from "@mui/material/TextField";
export function TextField({ 
// register,
control, name, rules, ...props }) {
    const { field: { onChange, onBlur, value, ref }, fieldState: { isTouched, error }, } = useController({
        name,
        control,
        rules,
    });
    return (_jsx(MuiTextField, { ...props, inputRef: ref, onChange: onChange, onBlur: onBlur, value: value, name: name, error: !!error, 
        // TODO: handle required error
        // helperText={isTouched && error?.message}
        helperText: error?.message }));
}
