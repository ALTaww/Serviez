import { ComboboxItem, Select } from "@mantine/core";
import userStore from "../store/userStore";
import { userApi } from "../api";
import { useRef } from "react";
import { createNewAbortController } from "../utils/createNewAbortController";
import { handleError } from "../utils/handleError";

const ChangeRole = () => {
  const abortControllerRef = useRef<AbortController>(null);
  const handleChangeRole = async (
    role: string | null,
    option: ComboboxItem
  ) => {
    if (!role) return;

    const { controller, signal } = createNewAbortController(abortControllerRef);
    abortControllerRef.current = controller;

    try {
      await userApi.changeRole(role, signal);
    } catch (e) {
      handleError(e);
    }
  };

  return (
    <Select
      checkIconPosition="right"
      data={["client", "employee", "admin"]}
      pb={150}
      label="role"
      placeholder="Pick value"
      onChange={handleChangeRole}
      defaultValue={userStore.data?.role || "client"}
    />
  );
};

export default ChangeRole;
