import { useState } from "react";
import {
  Stepper,
  Button,
  Group,
  TextInput,
  Code,
  NumberInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";

const CreateServiceForm = () => {
  const [active, setActive] = useState(0);

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      name: "",
      price: "",
      type: "",
      description: "",
      time_doing_min: "",
    },

    validate: (values) => {
      if (active === 0) {
        return {
          name:
            values.name.trim().length < 2
              ? "Название должно включать хотя бы 2 символа"
              : null,
          price: isNaN(+values.price) ? "Цена должна быть числом" : null,
          type:
            values.type.trim().length < 2
              ? "Тип услуги должен включать хотя бы 2 символа"
              : null,
        };
      }

      if (active === 1) {
        return {
          description:
            values.description.trim().length < 5
              ? "Описание должно иметь хотя бы 5 знаков"
              : null,
        };
      }

      if (active === 2) {
        return {
          time_doing_min: isNaN(+values.time_doing_min)
            ? "Время выполнения должно быть числом"
            : null,
        };
      }

      return {};
    },
  });

  const nextStep = () =>
    setActive((current) => {
      if (form.validate().hasErrors) {
        return current;
      }
      return current < 3 ? current + 1 : current;
    });

  const prevStep = () =>
    setActive((current) => (current > 0 ? current - 1 : current));

  return (
    <>
      <Stepper active={active}>
        <Stepper.Step label="Первый шаг" description="Основная информация">
          <h2>Создать новую услугу</h2>
          <TextInput
            label="Название"
            placeholder="Название"
            key={form.key("name")}
            {...form.getInputProps("name")}
          />
          <NumberInput
            mt="md"
            label="Цена"
            placeholder="Цена"
            key={form.key("price")}
            {...form.getInputProps("price")}
          />
          <TextInput
            mt="md"
            label="Тип"
            placeholder="Тип"
            key={form.key("type")}
            {...form.getInputProps("type")}
          />
        </Stepper.Step>

        <Stepper.Step label="Второй шаг" description="Опишите вашу услугу">
          <TextInput
            label="Описание"
            placeholder="Описание"
            key={form.key("description")}
            {...form.getInputProps("description")}
          />
        </Stepper.Step>

        <Stepper.Step label="Последний шаг" description="Время выполнения">
          <TextInput
            label="Время выполнения"
            placeholder="Время выполнения"
            key={form.key("time_doing_min")}
            {...form.getInputProps("time_doing_min")}
          />
        </Stepper.Step>
        <Stepper.Completed>
          Completed! Form values:
          <Code block mt="xl">
            {JSON.stringify(form.getValues(), null, 2)}
          </Code>
        </Stepper.Completed>
      </Stepper>

      <Group justify="flex-end" mt="xl">
        {active !== 0 && (
          <Button variant="default" onClick={prevStep}>
            Back
          </Button>
        )}
        {active !== 3 && <Button onClick={nextStep}>Next step</Button>}
      </Group>
    </>
  );
};

export default CreateServiceForm;
