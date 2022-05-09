import { useContext } from "react";
import { UserContext } from "../../context";
import UserRoute from "../../components/routes/UserRoute";

import Link from "next/link";
import { useRouter } from "next/router";
import Sidebar from "../../components/Sidebar";
import Nav from "../../components/Nav";

const Dashboard = () => {
  const [state, setState] = useContext(UserContext);
  const router = useRouter();

  const logout = () => {
    window.localStorage.removeItem("auth");
    setState(null);
    router.push("/login");
  };

  return (
    <UserRoute>
      <div id="app">
        <Sidebar page="dashboard" />
        <div id="main">
          <Nav />
          <div className="main-content container-fluid">
            <div className="page-title">
              <h3>Dashboard</h3>
            </div>
            <section className="section">
              <h1>Hello, {state && state.name && state.name}</h1>
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
    </UserRoute>
  );
};
export default Dashboard;
