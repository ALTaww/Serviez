import { Link } from "react-router-dom";
import { ColorSchemeIcons } from "../../templates";
import styles from "./header.module.scss";
import { paths } from "../../paths";
import LogoutButton from "../../templates/LogoutButton";
import ChangeRole from "../../templates/ChangeRole";

const Header = () => {
  return (
    <header>
      <div className={styles.header}>
        <h1>Serviez</h1>
        <nav>
          <ul>
            <li>
              <Link to={paths.Home}>Home</Link>
            </li>
            <li>
              <Link to={"#"}>About</Link>
            </li>
            <li>
              <Link to="#">Contact</Link>
            </li>
          </ul>
        </nav>
        <LogoutButton />
        <ChangeRole />
        <ColorSchemeIcons />
      </div>
    </header>
  );
};

export default Header;
