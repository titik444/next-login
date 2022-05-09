import { useState } from "react";
import UserRoute from "../../../components/routes/UserRoute";
import axios from "axios";
import { toast } from "react-toastify";
import FeatherIcon from "feather-icons-react";
import Link from "next/link";

import Sidebar from "../../../components/Sidebar";
import Nav from "../../../components/Nav";

const Update = () => {
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState([]);
  const [submit, setSubmit] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const { data } = await axios.post(`/change-password`, {
        current_password: password,
        new_password: newPassword,
        new_confirm_password: confirmPassword,
      });

      setSubmit(true);

      if (!data.success) {
        toast.error(data.message);
        setErrors(data.data);

        console.log(data.data);
        setLoading(false);
      } else {
        toast.success(data.message);
        setPassword("");
        setNewPassword("");
        setConfirmPassword("");
        setLoading(false);
      }
    } catch ({ response }) {
      console.log(response);
      setLoading(false);
    }
  };

  return (
    <UserRoute>
      <div id="app" className="cpass">
        <Sidebar />
        <div id="main">
          <Nav />
          <div className="main-content container-fluid">
            <div className="page-title">
              <h3>Change Password</h3>
            </div>
            <section className="section">
              <form onSubmit={handleSubmit}>
                <div className="form-floating mb-3">
                  <input
                    type="password"
                    className={`form-control ${
                      errors.current_password
                        ? "is-invalid"
                        : submit
                        ? "is-valid"
                        : ""
                    }`}
                    id="floatingPassword"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <label htmlFor="floatingPassword">Old Password</label>
                  {errors.current_password && (
                    <div className="invalid-feedback">
                      {errors.current_password}
                    </div>
                  )}
                </div>
                <div className="form-floating mb-3">
                  <input
                    type="password"
                    className={`form-control ${
                      errors.new_password
                        ? "is-invalid"
                        : submit
                        ? "is-valid"
                        : ""
                    }`}
                    id="floatingNewPassword"
                    placeholder="Password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                  <label htmlFor="floatingNewPassword">New Password</label>
                  {errors.new_password && (
                    <div className="invalid-feedback">
                      {errors.new_password}
                    </div>
                  )}
                </div>
                <div className="form-floating mb-3">
                  <input
                    type="password"
                    className={`form-control ${
                      errors.new_confirm_password
                        ? "is-invalid"
                        : submit
                        ? "is-valid"
                        : ""
                    }`}
                    id="floatingConfirmPassword"
                    placeholder="Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                  <label htmlFor="floatingConfirmPassword">
                    Confirm Password
                  </label>
                  {errors.new_confirm_password && (
                    <div className="invalid-feedback">
                      {errors.new_confirm_password}
                    </div>
                  )}
                </div>
                <div className="row">
                  <div className="col-lg">
                    <p style={{ marginTop: "1vh" }}>
                      <Link href="/user/dashboard">
                        <a className="acc-link align-middle">
                          <FeatherIcon icon="arrow-left" /> Back to home
                        </a>
                      </Link>
                    </p>
                  </div>
                  <div className="col-lg">
                    <button
                      disabled={loading}
                      style={{ marginTop: ".25vh" }}
                      className="btn btn-purple acc-btn-login align-middle"
                      type="submit"
                    >
                      {loading ? (
                        <>
                          <span
                            className="spinner-border spinner-border-sm"
                            role="status"
                            aria-hidden="true"
                          />{" "}
                          Change Password
                        </>
                      ) : (
                        "Change Password"
                      )}
                    </button>
                  </div>
                </div>
              </form>
            </section>
          </div>
        </div>
      </div>
    </UserRoute>
  );
};

export default Update;
