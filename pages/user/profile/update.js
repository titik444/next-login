import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";

const Update = () => {
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(`/change-password`, {
        current_password: password,
        new_password: newPassword,
        new_confirm_password: confirmPassword,
      });

      console.log(data);

      if (!data.success) {
        alert(data.message);
      } else {
        alert(data.message);
        setPassword("");
        setNewPassword("");
        setConfirmPassword("");
      }
    } catch ({ response }) {
      console.log(response);
    }
  };

  return (
    <div id="app" className="cpass">
      <div id="sidebar" className="active">
        <div className="sidebar-wrapper active">
          <div className="sidebar-header">
            <a href="index.html" className="sidebar-link">
              Admin
            </a>
          </div>
          <div className="sidebar-menu">
            <ul className="menu">
              <li className="sidebar-title">Main Menu</li>
              <li className="sidebar-item ">
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
                  <a className="dropdown-item" href="#">
                    <i data-feather="key" /> Change Password
                  </a>
                  <div className="dropdown-divider" />
                  <a className="dropdown-item" href="#">
                    <i data-feather="log-out" /> Logout
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </nav>
        <div className="main-content container-fluid">
          <div className="page-title">
            <h3>Change Password</h3>
          </div>
          <section className="section">
            <form onSubmit={handleSubmit}>
              <div className="form-floating mb-3">
                <input
                  type="password"
                  className="form-control"
                  id="floatingPassword"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <label htmlFor="floatingPassword">Old Password</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  type="password"
                  className="form-control"
                  id="floatingNewPassword"
                  placeholder="Password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
                <label htmlFor="floatingNewPassword">New Password</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  type="password"
                  className="form-control"
                  id="floatingConfirmPassword"
                  placeholder="Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <label htmlFor="floatingConfirmPassword">
                  Confirm Password
                </label>
              </div>
              <div className="row">
                <div className="col-lg">
                  <p style={{ marginTop: "1vh" }}>
                    <Link href="/user/dashboard">
                      <a className="acc-link align-middle">
                        <i data-feather="arrow-left" /> Back to home
                      </a>
                    </Link>
                  </p>
                </div>
                <div className="col-lg">
                  <button
                    style={{ marginTop: ".25vh" }}
                    className="btn btn-purple acc-btn-login align-middle"
                    type="submit"
                  >
                    Change Password
                  </button>
                </div>
              </div>
            </form>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Update;
