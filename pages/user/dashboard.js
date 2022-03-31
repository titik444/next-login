import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";

const Dashboard = () => {
  const router = useRouter();
  const [state, setState] = useState({
    name: {},
    token: "",
  });

  useEffect(() => {
    setState(JSON.parse(window.localStorage.getItem("auth")));
  }, []);

  useEffect(() => {
    if (state && state.token) getCurrentUser();
  }, [state && state.token]);

  const token = state && state.token ? state.token : "";
  axios.defaults.baseURL = process.env.NEXT_PUBLIC_API;
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  const getCurrentUser = async () => {
    console.log(token);
    try {
      await axios.get(`/current-user`);
    } catch (err) {
      router.push("/login");
    }
  };

  // process.browser &&
  // typeof window === "undefined" &&
  state === null &&
    setTimeout(() => {
      getCurrentUser();
    }, 100);

  const logout = () => {
    window.localStorage.removeItem("auth");
    setState(null);
    router.push("/login");
  };

  return (
    <div id="app">
      <div id="sidebar" className="active">
        <div className="sidebar-wrapper active">
          <div className="sidebar-header">
            <a href="#" className="sidebar-link">
              Admin
            </a>
          </div>
          <div className="sidebar-menu">
            <ul className="menu">
              <li className="sidebar-title">Main Menu</li>
              <li className="sidebar-item active ">
                <a href="index.html" className="sidebar-link">
                  <i data-feather="home" width={20} />
                  <span>Dashboard</span>
                </a>
              </li>
            </ul>
          </div>
          <button className="sidebar-toggler btn x">
            <i data-feather="x" />
          </button>
        </div>
      </div>
      <div id="main">
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
                    Hi, Stevan
                  </div>
                </a>
                <div className="dropdown-menu dropdown-menu-end">
                  <Link href="/user/profile/update">
                    <a className="dropdown-item">
                      <i data-feather="key" /> Change Password
                    </a>
                  </Link>
                  <div className="dropdown-divider" />
                  <a onClick={logout} className="dropdown-item">
                    <i data-feather="log-out" /> Logout
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </nav>
        <div className="main-content container-fluid">
          <div className="page-title">
            <h3>Dashboard</h3>
          </div>
          <section className="section">
            <h1>Hello, Stevan Andreas</h1>
            <div className="row">
              <div className="col-lg">
                <Link href="/user/profile/update">
                  <a className="btn btn-purple mb-3">Change Password</a>
                </Link>
              </div>
              <div className="col-lg">
                <a onClick={logout} className="btn btn-purple mb-3">
                  Logout
                </a>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
export default Dashboard;
