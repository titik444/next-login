import { useState } from "react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";

// axios.defaults.withCredentials = true;
axios.defaults.baseURL = process.env.NEXT_PUBLIC_API;

const Login = () => {
  const [username, setUsername] = useState("test@test.com");
  const [password, setPassword] = useState("123456");

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // /sanctum/csrf-cookie
      // await axios.get(`/sanctum/csrf-cookie`);

      const { data } = await axios.post(`/login`, {
        username,
        password,
      });

      if (!data.success) {
        alert("Username atau Password Salah!");
      } else {
        // save in local storage
        window.localStorage.setItem("auth", JSON.stringify(data.data));

        router.push("/user/dashboard");
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
                <h2 className="acc-title">Welcome Back</h2>
                <hr className="acc-underline" />
              </div>
              <img
                className="acc-img-1"
                src="assets/vector/5448 [Converted].svg"
              />
            </div>
            <div className="col-lg acc-form">
              <div className="container" id="acc-container">
                <h2 className="acc-title">Login your account</h2>

                <form onSubmit={handleSubmit}>
                  <h5 className="acc-label">Email / Phone Number</h5>
                  <input
                    className="acc-input"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                  <hr className="acc-input-hr mb-3" />

                  <h5 className="acc-label">Password</h5>
                  <input
                    className="acc-input"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <hr className="acc-input-hr mb-3" />

                  <div className="form-check mb-5">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      defaultValue
                      id="flexCheckDefault"
                    />
                    <label
                      className="form-check-label"
                      htmlFor="flexCheckDefault"
                    >
                      Remember Me
                    </label>
                  </div>

                  <button
                    className="btn btn-purple acc-btn-login"
                    type="submit"
                  >
                    Login
                  </button>

                  <p>
                    <Link href="/register">
                      <a className="acc-link mb-5">
                        Don't have an account yet? Create account
                      </a>
                    </Link>
                  </p>

                  <small>
                    <Link href="/forgot-password">
                      <a className="acc-link">Forgot Password?</a>
                    </Link>
                    <hr className="acc-link-hr" />
                  </small>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
