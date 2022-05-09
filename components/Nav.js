import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context";
import Link from "next/link";
import { useRouter } from "next/router";
import FeatherIcon from "feather-icons-react";

const Nav = () => {
  const [state, setState] = useContext(UserContext);
  const router = useRouter();

  const logout = () => {
    window.localStorage.removeItem("auth");
    setState(null);
    router.push("/login");
  };

  return (
    <nav className="navbar navbar-header navbar-expand navbar-light">
      <a className="sidebar-toggler" href="#">
        <span className="navbar-toggler-icon" />
      </a>
      <button
        className="btn navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon" />
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav d-flex align-items-center navbar-light ms-auto">
          <li className="dropdown">
            <a
              href="#"
              data-bs-toggle="dropdown"
              className="nav-link dropdown-toggle nav-link-lg nav-link-user"
            >
              <div className="avatar me-1">
                <img src="/assets/images/avatar/avatar-s-1.png" />
              </div>

              <div className="d-none d-md-block d-lg-inline-block">
                Hi, {state && state.name && state.name}
              </div>
            </a>
            <div className="dropdown-menu dropdown-menu-end">
              <Link href="/user/profile/update">
                <a className="dropdown-item">
                  <FeatherIcon icon="key" /> Change Password
                </a>
              </Link>
              <div className="dropdown-divider" />
              <a
                onClick={logout}
                style={{ cursor: "pointer" }}
                className="dropdown-item"
              >
                <FeatherIcon icon="log-out" />
                Logout
              </a>
            </div>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Nav;
