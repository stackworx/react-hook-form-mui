/** Maps the form value to the value the component shows and back, e.g. ISO strings to dates. */
export interface FieldTransform<TFormValue, TValue> {
  input: (formValue: TFormValue) => TValue;
  output: (value: TValue) => TFormValue;
}
