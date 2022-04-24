import { jsx as _jsx } from "react/jsx-runtime";
import { useController, } from "react-hook-form";
import MuiSwitch from "@mui/material/Switch";
export function Switch({ control, name, rules, ...props }) {
    const { field: { onChange, onBlur, value, ref }, } = useController({
        name,
        control,
        rules,
    });
    return (_jsx(MuiSwitch, { ...props, checked: Boolean(value), inputRef: ref, onChange: onChange, onBlur: onBlur, value: value, required: !!rules?.required, name: name }));
}
