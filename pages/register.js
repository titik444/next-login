import { useState } from "react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";

axios.defaults.baseURL = process.env.NEXT_PUBLIC_API;

const Register = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [secret, setSecret] = useState("");

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(`/register`, {
        name,
        phone,
        email,
        password,
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
      <div id="acc">
        <div className="card card-acc">
          <div className="row">
            <div className="col-lg acc-bg">
              <div className="container" id="acc-container">
                <h2 className="acc-title">Getting Started</h2>
                <hr className="acc-underline" />
              </div>
              <img
                className="acc-img-1"
                src="assets/vector/5448 [Converted].svg"
              />
            </div>
            <div className="col-lg acc-form">
              <div className="container" id="acc-container">
                <h2 className="acc-title">Create your account</h2>
                <br />
                <form onSubmit={handleSubmit}>
                  <div className="form-floating mb-2">
                    <input
                      type="text"
                      className="form-control"
                      id="floatingName"
                      placeholder="Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                    <label htmlFor="floatingName">Name</label>
                  </div>
                  <div className="form-floating mb-2">
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
                  <div className="form-floating mb-2">
                    <input
                      type="email"
                      className="form-control"
                      id="floatingInput"
                      placeholder="Email Address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <label htmlFor="floatingInput">Email address</label>
                  </div>

                  <div className="form-floating mb-2">
                    <input
                      type="password"
                      className="form-control"
                      id="floatingPassword"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <label htmlFor="floatingPassword">Password</label>
                  </div>
                  <div className="form-floating mb-2">
                    <input
                      type="password"
                      className="form-control"
                      id="floatingConfirmPassword"
                      placeholder="Confirm Password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <label htmlFor="floatingConfirmPassword">
                      Confirm Password
                    </label>
                  </div>
                  <div className="form-floating mb-2">
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
                    <label htmlFor="floatingAnswer">
                      Write your answer here
                    </label>
                  </div>
                  {/* <br>
                      <br> */}
                  <div className="row">
                    <div className="col-lg">
                      <p>
                        <Link href="/login">
                          <a className="acc-link align-middle">
                            Already have an account? Login
                          </a>
                        </Link>
                      </p>
                    </div>
                    <div className="col-lg">
                      <button
                        className="btn btn-purple acc-btn-login align-middle"
                        type="submit"
                      >
                        Signup
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
