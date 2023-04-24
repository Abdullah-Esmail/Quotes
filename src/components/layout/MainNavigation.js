import { NavLink, useHistory } from "react-router-dom";
import { getAuthToken } from "../../lib/UserSideAuth";
// import "../../My-Toolkit.css";
import style from "./MainNavigation.module.css";

const MainNavigation = () => {
  const history = useHistory();
  const token = getAuthToken();
  const logoutHandler = () => {
    localStorage.removeItem("token");
    history.go("/login");
  };

  return (
    <header className={style.header}>
      <h1 className={style.logo}>Great Quotes</h1>
      <nav className={style.nav}>
        <ul>
          <li>
            <NavLink activeClassName={style.active} to="/quotes">
              All Quotes
            </NavLink>
          </li>
          <li>
            <NavLink activeClassName={style.active} to="/new-quote">
              Add Quote
            </NavLink>
          </li>
          <li>
            <NavLink activeClassName={style.active} to="/about">
              About Us
            </NavLink>
          </li>
          {token ? (
            <li>
              <NavLink to="/login">
                <button onClick={logoutHandler} className="m-btn">
                  logout
                </button>
              </NavLink>
            </li>
          ) : (
            <li>
              <NavLink activeClassName={style.active} to="/login">
                login
              </NavLink>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
