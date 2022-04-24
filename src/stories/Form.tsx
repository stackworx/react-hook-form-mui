import * as React from "react";
import {
  UseFormReturn,
  SubmitHandler,
  FormState,
  UnpackNestedValue,
  UseFormGetValues,
} from "react-hook-form";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

interface FormProps<TFieldValues> extends UseFormReturn<TFieldValues, {}> {
  children: React.ReactNode;
  onSubmit: SubmitHandler<TFieldValues>;
}

function Values<TFieldValues>({
  getValues,
}: {
  getValues: UseFormGetValues<TFieldValues>;
}) {
  const [values, setValues] = React.useState(() => getValues());
  React.useEffect(() => {
    const ref = setInterval(() => {
      const v = getValues();
      setValues(v);
    }, 200);

    return () => {
      clearInterval(ref);
    };
  }, [getValues]);

  // console.log("values", values);
  return <pre>Values: {JSON.stringify(values, null, 2)}</pre>;
}

function Errors<TFieldValues>({
  errors,
}: {
  errors: FormState<TFieldValues>["errors"];
}) {
  return <pre>Errors: {JSON.stringify(errors, null, 2)}</pre>;
}

export function Form<TFieldValues>({
  handleSubmit,
  formState,
  children,
  getValues,
  reset,
  onSubmit,
}: FormProps<TFieldValues>) {
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box sx={{ p: 2 }}>
        <>{children}</>
        <Values getValues={getValues} />
        {/* <Errors errors={formState.errors} /> */}
        <Stack sx={{ p: 1 }} direction="row">
          <Button
            sx={{ m: 1 }}
            variant="contained"
            color="primary"
            type="submit"
          >
            Submit
          </Button>
          <Button
            sx={{ m: 1 }}
            variant="contained"
            color="secondary"
            onClick={() => reset()}
          >
            Reset
          </Button>
        </Stack>
      </Box>
    </form>
  );
}
