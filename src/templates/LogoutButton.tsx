import { useRef } from "react";
import userStore from "../store/userStore";
import { observer } from "mobx-react-lite";
import { Button } from "@mantine/core";
import { handleError } from "../utils/handleError";
import { authApi } from "../api";
import { createNewAbortController } from "../utils/createNewAbortController";

const LogoutButton = () => {
  const abortControllerRef = useRef<AbortController>(null);
  const handleLogout = async () => {
    const { controller, signal } = createNewAbortController(abortControllerRef);
    abortControllerRef.current = controller;

    try {
      const response = await authApi.logout(signal);
      userStore.logout();
      console.log("logout success");
    } catch (e) {
      handleError(e);
    }
  };
  if (!userStore.isAuth) {
    return null;
  }
  return (
    <>
      {userStore.isAuth && (
        <Button className="logout-button" onClick={handleLogout}>
          Выйти
        </Button>
      )}
    </>
  );
};

export default observer(LogoutButton);
