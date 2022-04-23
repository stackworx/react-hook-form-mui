import * as React from "react";
import {
  useForm,
  SubmitHandler,
  FormState,
  UnpackNestedValue,
} from "react-hook-form";

interface FormProps<TFieldValues> {
  handleSubmit: ;
  formState: FormState<TFieldValues>;
  children: React.ReactNode;
}

export function Form<TFieldValues>({
  handleSubmit,
  formState,
  children,
}: FormProps<TFieldValues>) {
  const onSubmit: SubmitHandler<TFieldValues> = React.useCallback(
    (
      data: UnpackNestedValue<TFieldValues>,
      _event?: React.BaseSyntheticEvent
    ) => {
      console.log(data);
    },
    []
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <>{children}</>
      <pre>{JSON.stringify(formState.errors, null, 2)}</pre>
    </form>
  );
}
