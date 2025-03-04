import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import { paths } from "./paths";

export interface IComponent {
  path: string;
  Component: () => React.JSX.Element;
}

export const routes: IComponent[] = [
  {
    path: paths.Home,
    Component: Home,
  },
  {
    path: paths.NotFound,
    Component: NotFound,
  },
];
