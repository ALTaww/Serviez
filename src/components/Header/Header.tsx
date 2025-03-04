import { Link } from "react-router-dom";
import { ColorSchemeIcons } from "../../templates";
import styles from "./header.module.scss";
import { paths } from "../../paths";

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
        <ColorSchemeIcons />
      </div>
    </header>
  );
};

export default Header;
