import { jsx as _jsx } from "react/jsx-runtime";
import { useController, } from "react-hook-form";
import MuiCheckbox from "@mui/material/Checkbox";
export function CheckboxGroup({ control, name, rules, value, ...props }) {
    const { field } = useController({
        name,
        control,
        rules,
    });
    const { onChange, onBlur, ref } = field;
    return (_jsx(MuiCheckbox, { ...props, checked: 
        // @ts-expect-error must be array
        field.value.includes(value), inputRef: ref, onChange: (_event, checked) => {
            if (checked) {
                onChange([
                    // @ts-expect-error must be array
                    ...field.value,
                    value,
                ]);
            }
            else {
                onChange(
                // @ts-expect-error must be array
                field.value.filter((v) => v !== value));
            }
        }, onBlur: onBlur, value: value, required: !!rules?.required, name: name }));
}
