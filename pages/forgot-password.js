import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";

const ForgotPassword = () => {
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [secret, setSecret] = useState("");

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(`/forgot-password`, {
        phone,
        email,
        password: newPassword,
        c_password: confirmPassword,
        secret,
      });

      if (!data.success) {
        alert(data.message);
      } else {
        alert(data.message);
        router.push("/login");
      }
    } catch ({ response }) {
      console.log(response);
    }
  };

  return (
    <div className="container">
      <div id="acc" className="for-pass">
        <div className="row">
          <div className="col-lg acc-bg" style={{ background: "unset" }}>
            <img className="acc-img-2" src="assets/vector/5796109.svg" alt />
          </div>
          <div className="col-lg acc-form">
            <div className="container" id="acc-container">
              <h2 className="acc-title">Forgot Password?</h2>
              <br />
              <form onSubmit={handleSubmit}>
                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="floatingPhoneNumber"
                    placeholder="Phone Number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                  <label htmlFor="floatingPhoneNumber">Phone Number</label>
                </div>
                <div className="form-floating mb-3">
                  <input
                    type="email"
                    className="form-control"
                    id="floatingInput"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <label htmlFor="floatingInput">Email address</label>
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
                    className="form-control"
                    id="floatingAnswer"
                    placeholder="Answer"
                    value={secret}
                    onChange={(e) => setSecret(e.target.value)}
                  />
                  <label htmlFor="floatingAnswer">Write your answer here</label>
                </div>
                <br />
                <br />
                <div className="row">
                  <div className="col-lg">
                    <p style={{ marginTop: "1vh" }}>
                      <Link href="/login">
                        <a className="acc-link align-middle">
                          <i data-feather="arrow-left" /> Back to login
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
                      Reset Password
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
