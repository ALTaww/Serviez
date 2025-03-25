import { Button, Checkbox, Group, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { FormEvent, useRef } from "react";
import { createNewAbortController } from "../../utils/createNewAbortController";
import { authApi } from "../../api";
import userStore from "../../store/userStore";
import { handleError } from "../../utils/handleError";
import { observer } from "mobx-react-lite";

const Register = () => {
  const abortControllerRef = useRef<AbortController>(null);

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      name: "",
      surname: "",
      email: "",
      password: "",
      termsOfService: false,
    },

    validate: {
      name: (value) =>
        value.length >= 2 ? null : "Имя должно быть не менее 2 символов",
      surname: (value) =>
        value.length >= 2 ? null : "Имя должно быть не менее 2 символов",
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      password: (value) =>
        value.length >= 8 ? null : "Пароль должен быть не менее 8 символов",
    },
  });

  // Этот колбек сработает ТОЛЬКО если валидация пройдена
  const handleRegisterSubmit = form.onSubmit(async (values) => {
    const { controller, signal } = createNewAbortController(abortControllerRef);
    abortControllerRef.current = controller;

    try {
      const { name, surname, email, password } = values;
      const user = await authApi.register(
        { name, surname, email, password },
        signal
      );
      userStore.login(user);
    } catch (error) {
      handleError(error);
    }
  });

  return (
    <form onSubmit={handleRegisterSubmit}>
      <h2>Зарегистрироваться</h2>
      <TextInput
        withAsterisk
        placeholder="Иван"
        label="Имя"
        key={form.key("name")}
        {...form.getInputProps("name")}
      />
      <TextInput
        withAsterisk
        placeholder="Иванов"
        label="Фамилия"
        key={form.key("surname")}
        {...form.getInputProps("surname")}
      />
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
        <Button type="submit">Отправить</Button>
      </Group>
    </form>
  );
};

export default observer(Register);
