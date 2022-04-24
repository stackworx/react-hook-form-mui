import { jsx as _jsx } from "react/jsx-runtime";
import { useController, } from "react-hook-form";
import MuiSelect from "@mui/material/Select";
export function Select({ control, name, rules, ...props }) {
    const { field: { onChange, onBlur, value, ref }, fieldState: { isTouched, error }, } = useController({
        name,
        control,
        rules,
    });
    return (_jsx(MuiSelect, { ...props, inputRef: ref, onChange: onChange, onBlur: onBlur, value: value, name: name, error: !!error }));
}
