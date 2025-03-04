import "@mantine/core/styles.css"; // All packages except `@mantine/hooks` require styles imports
import { MantineProvider } from "@mantine/core";
import { AppRouter, Header } from "./components";
import "./scss/app.scss";
import { BrowserRouter } from "react-router-dom";

function App() {
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

export default App;
