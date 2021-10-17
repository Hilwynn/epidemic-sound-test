import { NavLink } from "react-router-dom";
import styles from "./Menu.module.scss";
import logo from "../../assets/logo.svg";

function Menu() {
  return (
    <nav className={styles.navigation}>
      <img
        src={logo}
        className={styles.logo}
        alt="Logo"
        width="32px"
        height="39px"
      />
      <h1 className="visually-hidden">Epizootic Sounds</h1>
      <ul className={styles.menu}>
        <li>
          <NavLink to="/" activeClassName={styles.active} exact>
            Tracks
          </NavLink>
        </li>
        <li>
          <NavLink to="/playlists" activeClassName={styles.active}>
            Playlists
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Menu;
