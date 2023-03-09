import { useCallback } from "react";
import { FormProvider, useForm } from "react-hook-form";

import Button from "../../components/Button";
import TextField from "../../components/TextField";

const defaultValues = {
  username: "",
  password: "",
};

function Login() {
  const methods = useForm({ defaultValues });
  const { handleSubmit } = methods;

  const submit = useCallback(() => {
    // eslint-disable-next-line no-console
    console.log("submit");
  }, []);

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(submit)}>
        <TextField name="username" label="Usuário" />

        <TextField name="password" label="Senha" />

        <Button type="submit" onClick={() => {}}>
          Entrar
        </Button>
      </form>
    </FormProvider>
  );
}

export default Login;
