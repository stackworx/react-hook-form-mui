import {createTheme, ThemeProvider} from '@mui/material/styles';
import {render} from '@testing-library/react';
import type {ReactNode} from 'react';
import {useForm} from 'react-hook-form';
import type {
  Control,
  DefaultValues,
  FieldValues,
  Mode,
  UseFormReturn,
} from 'react-hook-form';

export function renderWithForm<T extends FieldValues>(
  ui: (control: Control<T>) => ReactNode,
  options: {defaultValues?: DefaultValues<T>; mode?: Mode} = {},
) {
  const result: {form?: UseFormReturn<T>} = {};
  function Harness() {
    const form = useForm<T>({
      defaultValues: options.defaultValues,
      mode: options.mode ?? 'onChange',
    });
    result.form = form;
    return (
      <ThemeProvider theme={createTheme()}>
        <form
          onSubmit={(event) => {
            event.preventDefault();
          }}
        >
          {ui(form.control)}
        </form>
      </ThemeProvider>
    );
  }
  const rendered = render(<Harness />);
  if (!result.form) throw new Error('form did not initialise');
  return {...rendered, form: result.form};
}
