import { useRef, useState } from "react";
import {
  Stepper,
  Button,
  Group,
  TextInput,
  Code,
  NumberInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { IService, IServiceVariant } from "../../types/database";
import { serviceApi, serviceVariantApi } from "../../api";
import { createNewAbortController } from "../../utils/createNewAbortController";
import { SERVICE_VARIANT_CREATE } from "../../types/types";
import { handleError } from "../../utils/handleError";

const CreateServiceForm = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [serviceData, setServiceData] = useState<IService | null>(null);
  const [variantsData, setVariantsData] = useState<IServiceVariant[]>([]);
  const [variantsCreateData, setVariantsCreateData] = useState<
    SERVICE_VARIANT_CREATE[]
  >([]);
  const abortControllerRef = useRef<AbortController>(null);

  const serviceInitialValues: Omit<
    IService,
    "_id" | "owner" | "variants" | "isActive"
  > = {
    title: "",
    description: "",
    category: "",
  };

  // СДЕЛАТЬ controlled !!!!
  const serviceForm = useForm({
    mode: "uncontrolled",
    initialValues: serviceInitialValues,
    validateInputOnBlur: true,

    validate: (values) => {
      return {
        title:
          values.title.trim().length < 2
            ? "Название должно включать хотя бы 2 символа"
            : null,
        description:
          values.description.trim().length < 2
            ? "Описание должно включать хотя бы 2 символа"
            : null,
        category:
          values.category.trim().length < 2
            ? "Тип услуги должен включать хотя бы 2 символа"
            : null,
      };
    },
  });

  const variantInitialValues: SERVICE_VARIANT_CREATE = {
    title: "",
    description: "",
    price: 0,
    duration: 0,
  };

  const variantForm = useForm({
    mode: "uncontrolled",
    initialValues: variantInitialValues,

    validate: (values) => {
      return {
        title:
          values.title.trim().length < 2
            ? "Название должно включать хотя бы 2 символа"
            : null,
        description:
          values.description.trim().length < 2
            ? "Описание должно включать хотя бы 2 символа"
            : null,
        price: isNaN(+values.price)
          ? "Тип услуги должен включать хотя бы 2 символа"
          : null,
      };
    },
  });

  // ОБРАБОТАТЬ НУЛИ В ДЛИНЕ МАССИВА
  const nextStep = async () => {
    if (serviceForm.validate().hasErrors) return;

    const { controller, signal } = createNewAbortController(abortControllerRef);
    abortControllerRef.current = controller;

    try {
      if (activeStep === 0) {
        const service = await serviceApi.createService(
          serviceForm.getValues(),
          signal
        );
        setServiceData(service);
      } else if (activeStep === 1) {
        if (variantForm.validate().hasErrors) return;

        if (!serviceData) {
          console.log("no serviceData saved in 1 step");
          return;
        }

        console.log(variantsCreateData, variantsData);
        const createdVariants = await serviceVariantApi.createMultiple(
          serviceData._id,
          variantsCreateData,
          signal
        );
        setVariantsData((data) => [...data, createdVariants]);
        setVariantsCreateData([]);
        variantForm.reset();
      }
    } catch (e) {
      handleError(e);
    }

    setActiveStep((current) => {
      return current < 3 ? current + 1 : current;
    });
  };

  const prevStep = () =>
    setActiveStep((current) => (current > 0 ? current - 1 : current));

  const addOneMoreVariant = () => {
    if (!variantForm.isValid()) {
      console.log("form isn't valid");
    }
    setVariantsCreateData((data) => [...data, variantForm.getValues()]);
    variantForm.reset();
  };

  const removeVariant = () => {
    if (variantsCreateData.length >= 1)
      variantForm.setValues(variantsCreateData[variantsCreateData.length - 1]);
    setVariantsCreateData((data) => data.slice(0, -1));
  };

  return (
    <>
      <Stepper active={activeStep}>
        <Stepper.Step label="Первый шаг" description="Основная информация">
          <h2>Создать новую услугу</h2>
          <TextInput
            label="Название"
            placeholder="Название"
            key={serviceForm.key("title")}
            {...serviceForm.getInputProps("title")}
          />
          <TextInput
            mt="md"
            label="Описание"
            placeholder="Описание"
            key={serviceForm.key("description")}
            {...serviceForm.getInputProps("description")}
          />
          <TextInput
            mt="md"
            label="Тип"
            placeholder="Тип"
            key={serviceForm.key("category")}
            {...serviceForm.getInputProps("category")}
          />
        </Stepper.Step>

        <Stepper.Step label="Второй шаг" description="Опишите виды ваших услуг">
          <TextInput
            label="Название услуги"
            placeholder="Название услуги"
            key={variantForm.key("title")}
            {...variantForm.getInputProps("title")}
          />
          <TextInput
            mt="md"
            label="Описание"
            placeholder="Описание"
            key={variantForm.key("description")}
            {...variantForm.getInputProps("description")}
          />
          <NumberInput
            mt="md"
            label="Время выполнения (минут)"
            placeholder="Время выполнения (минут)"
            key={variantForm.key("duration")}
            {...variantForm.getInputProps("duration")}
          />
          <NumberInput
            mt="md"
            label="Цена"
            placeholder="Цена"
            key={variantForm.key("price")}
            {...variantForm.getInputProps("price")}
          />
          {variantsCreateData.length >= 1 && (
            <Button mr="md" onClick={removeVariant}>
              Не создавать вариант услуги
            </Button>
          )}
          {variantsCreateData.length < 10 && (
            <Button onClick={addOneMoreVariant}>
              Создать ещё вариант услуги
            </Button>
          )}
        </Stepper.Step>

        <Stepper.Step label="Последний шаг" description="Часы работы">
          <TextInput
            label="Время выполнения"
            placeholder="Время выполнения"
            key={variantForm.key("time_doing_min")}
            {...variantForm.getInputProps("time_doing_min")}
          />
        </Stepper.Step>
        <Stepper.Completed>
          Completed! Form values:
          <Code block mt="xl">
            {JSON.stringify(serviceForm.getValues(), null, 2)}
            {JSON.stringify(variantForm.getValues(), null, 2)}
          </Code>
        </Stepper.Completed>
      </Stepper>

      <Group justify="flex-end" mt="xl">
        {activeStep !== 0 && (
          <Button variant="default" onClick={prevStep}>
            Back
          </Button>
        )}
        {activeStep !== 3 && <Button onClick={nextStep}>Next step</Button>}
      </Group>
    </>
  );
};

export default CreateServiceForm;
