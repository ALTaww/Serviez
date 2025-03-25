import { Button, Checkbox, Group, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import Register from "./Register";
import userStore from "../../store/userStore";
import { observer } from "mobx-react-lite";
import { authApi } from "../../api";
import { createNewAbortController } from "../../utils/createNewAbortController";
import { handleError } from "../../utils/handleError";

const Login = () => {
  const [isRegistered, setIsRegistered] = useState(true);
  const abortControllerRef = useRef<AbortController>(null);
  const form = useForm({
    mode: "uncontrolled",
    validateInputOnBlur: true, // Валидация при потере фокуса

    initialValues: {
      email: "",
      password: "",
      termsOfService: false,
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      password: (value) =>
        value.length >= 8 ? null : "Пароль должен быть не менее 8 символов",
    },
  });

  // Этот колбек сработает ТОЛЬКО если валидация пройдена
  const handleLoginSubmit = form.onSubmit(async (values) => {
    const { controller, signal } = createNewAbortController(abortControllerRef);
    abortControllerRef.current = controller;

    try {
      const { email, password } = values;
      const user = await authApi.login(email, password, signal);
      userStore.login(user);
    } catch (error) {
      handleError(error);
    }
  });

  if (userStore.isAuth) {
    return null;
  }

  return (
    <section className="login-component">
      {isRegistered ? (
        <form onSubmit={handleLoginSubmit}>
          <h2>Войти на сайт</h2>
          <TextInput
            withAsterisk
            label="Email"
            placeholder="your@email.com"
            key={form.key("email")}
            {...form.getInputProps("email")}
          />
          <TextInput
            withAsterisk
            label="Пароль"
            placeholder="somePassword814#$!"
            key={form.key("password")}
            {...form.getInputProps("password")}
          />
          <Checkbox
            mt="md"
            label="I agree to sell my privacy"
            key={form.key("termsOfService")}
            {...form.getInputProps("termsOfService", { type: "checkbox" })}
          />
          <Group justify="flex-end" mt="md">
            <Button type="submit">Submit</Button>
          </Group>
        </form>
      ) : (
        <Register />
      )}
      <div className="center">
        {isRegistered ? (
          <p>
            Нет аккаунта?{" "}
            <Link to="#" onClick={() => setIsRegistered(false)} role="button">
              Зарегистрироваться
            </Link>
          </p>
        ) : (
          <p>
            Есть аккаунт?{" "}
            <Link to="#" onClick={() => setIsRegistered(true)} role="button">
              Войти
            </Link>
          </p>
        )}
      </div>
    </section>
  );
};

export default observer(Login);
