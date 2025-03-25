import "@mantine/core/styles.css"; // All packages except `@mantine/hooks` require styles imports
import { MantineProvider } from "@mantine/core";
import { AppRouter, Header } from "./components";
import "./scss/app.scss";
import { BrowserRouter } from "react-router-dom";
import { useEffect } from "react";
import { handleError } from "./utils/handleError";
import { authApi } from "./api";
import userStore from "./store/userStore";
import { observer } from "mobx-react-lite";

function App() {
  useEffect(() => {
    (async () => {
      const controller = new AbortController();
      const signal = controller.signal;

      try {
        const user = await authApi.getMe(signal);
        userStore.login(user);
      } catch (e) {
        handleError(e);
      }
    })();
  }, []);

  return (
    <>
      <MantineProvider defaultColorScheme="auto">
        <BrowserRouter>
          <Header />
          <AppRouter />
        </BrowserRouter>
      </MantineProvider>
    </>
  );
}

export default observer(App);
