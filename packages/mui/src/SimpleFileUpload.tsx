import React from 'react';
import {
  useController,
  FieldValues,
  UseControllerProps,
  FieldPath,
} from 'react-hook-form';
import FormControl, { FormControlProps } from '@mui/material/FormControl';
import InputLabel, { InputLabelProps } from '@mui/material/InputLabel';
import Input, { InputProps } from '@mui/material/Input';
import FormHelperText from '@mui/material/FormHelperText';

export type SimpleFileUploadProps<
  TName extends FieldPath<TFieldValues>,
  TFieldValues extends FieldValues = FieldValues,
> = UseControllerProps<TFieldValues, TName> &
  Omit<InputProps, 'name' | 'type' | 'label' | 'inputProps'> & {
    label: string;
    accept: string;
    disabled?: boolean;
    InputLabelProps?: InputLabelProps;
    FormControlProps?: FormControlProps;
  };

export function SimpleFileUpload<
  TName extends FieldPath<TFieldValues>,
  TFieldValues extends FieldValues,
>({
  control,
  name,
  rules,
  label,
  accept,
  disabled = false,
  InputLabelProps: inputLabelProps,
  FormControlProps: formControlProps,
  ...props
}: SimpleFileUploadProps<TName, TFieldValues>) {
  const {
    field: { onChange, ref },
    fieldState: { error },
  } = useController({
    name,
    control,
    rules,
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;

    if (file) {
      const fileData = {
        size: file.size,
        name: file.name,
        type: file.type,
      };
      onChange(fileData);
    } else {
      onChange(null);
    }
  };

  return (
    <FormControl {...formControlProps}>
      {label && (
        <InputLabel shrink error={!!error} {...inputLabelProps}>
          {label}
        </InputLabel>
      )}
      <Input
        {...props}
        inputRef={ref}
        inputProps={{
          type: 'file',
          accept,
          disabled,
          onChange: handleFileChange,
        }}
        error={!!error}
      />
      {error && <FormHelperText error>{error.message}</FormHelperText>}
    </FormControl>
  );
}

SimpleFileUpload.displayName = 'MuiReactHookFormSimpleFileUpload';
