import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import FeatherIcon from "feather-icons-react";
import Link from "next/link";
import { useRouter } from "next/router";

const ForgotPassword = () => {
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [secret, setSecret] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState([]);
  const [submit, setSubmit] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const { data } = await axios.post(`/forgot-password`, {
        phone,
        email,
        password: newPassword,
        c_password: confirmPassword,
        secret,
      });

      setSubmit(true);

      if (!data.success) {
        toast.error(data.message);
        setErrors(data.data);
        setLoading(false);
      } else {
        toast.success(data.message);
        router.push("/login");
      }
    } catch ({ response }) {
      console.log(response);
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div id="acc" className="for-pass">
        <div className="row">
          <div className="col-lg acc-bg" style={{ background: "unset" }}>
            <img className="acc-img-2" src="assets/vector/5796109.svg" />
          </div>
          <div className="col-lg acc-form">
            <div className="container" id="acc-container">
              <h2 className="acc-title">Forgot Password?</h2>
              <br />
              <form onSubmit={handleSubmit}>
                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className={`form-control ${
                      errors.phone ? "is-invalid" : submit ? "is-valid" : ""
                    }`}
                    id="floatingPhoneNumber"
                    placeholder="Phone Number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                  <label htmlFor="floatingPhoneNumber">Phone Number</label>
                  {errors.phone && (
                    <div className="invalid-feedback">{errors.phone}</div>
                  )}
                </div>
                <div className="form-floating mb-3">
                  <input
                    type="email"
                    className={`form-control ${
                      errors.email ? "is-invalid" : submit ? "is-valid" : ""
                    }`}
                    id="floatingInput"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <label htmlFor="floatingInput">Email address</label>
                  {errors.email && (
                    <div className="invalid-feedback">{errors.email}</div>
                  )}
                </div>
                <div className="form-floating mb-3">
                  <input
                    type="password"
                    className={`form-control ${
                      errors.password ? "is-invalid" : submit ? "is-valid" : ""
                    }`}
                    id="floatingNewPassword"
                    placeholder="Password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                  <label htmlFor="floatingNewPassword">New Password</label>
                  {errors.password && (
                    <div className="invalid-feedback">{errors.password}</div>
                  )}
                </div>
                <div className="form-floating mb-3">
                  <input
                    type="password"
                    className={`form-control ${
                      errors.c_password
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
                  {errors.c_password && (
                    <div className="invalid-feedback">{errors.c_password}</div>
                  )}
                </div>
                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="floatingQuestion"
                    placeholder="Question"
                    defaultValue="What is your favorite color?"
                    readOnly
                  />
                  <label htmlFor="floatingQuestion">
                    Verification Question
                  </label>
                </div>
                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className={`form-control ${
                      errors.secret ? "is-invalid" : submit ? "is-valid" : ""
                    }`}
                    id="floatingAnswer"
                    placeholder="Answer"
                    value={secret}
                    onChange={(e) => setSecret(e.target.value)}
                  />
                  <label htmlFor="floatingAnswer">Write your answer here</label>
                  {errors.secret && (
                    <div className="invalid-feedback">{errors.secret}</div>
                  )}
                </div>
                <br />
                <br />
                <div className="row">
                  <div className="col-lg">
                    <p style={{ marginTop: "1vh" }}>
                      <Link href="/login">
                        <a className="acc-link align-middle">
                          <FeatherIcon icon="arrow-left" /> Back to login
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
                          Reset Password
                        </>
                      ) : (
                        "Reset Password"
                      )}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
