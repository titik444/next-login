import { useState, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Link from "next/link";
import { useRouter } from "next/router";
import { UserContext } from "../context";

// axios.defaults.withCredentials = true;
axios.defaults.baseURL = process.env.NEXT_PUBLIC_API;

const Login = () => {
  const [username, setUsername] = useState("test@test.com");
  const [password, setPassword] = useState("123456");
  const [loading, setLoading] = useState(false);
  const [state, setState] = useContext(UserContext);

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      // /sanctum/csrf-cookie
      // await axios.get(`/sanctum/csrf-cookie`);

      const { data } = await axios.post(`/login`, {
        username,
        password,
      });

      if (!data.success) {
        toast.error(data.message);
        setLoading(false);
      } else {
        // update context
        setState({
          name: data.data.name,
          token: data.data.token,
        });

        // save in local storage
        window.localStorage.setItem("auth", JSON.stringify(data.data));

        router.push("/user/dashboard");
      }
    } catch ({ response }) {
      console.log(response);
      setLoading(false);
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
                <br />

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
                    disabled={loading}
                    className="btn btn-purple acc-btn-login"
                    type="submit"
                  >
                    {loading ? (
                      <>
                        <span
                          className="spinner-border spinner-border-sm"
                          role="status"
                          aria-hidden="true"
                        />{" "}
                        Login
                      </>
                    ) : (
                      "Login"
                    )}
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
