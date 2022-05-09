import Link from "next/link";
import FeatherIcon from "feather-icons-react";

const Sidebar = ({ page }) => {
  const dashboardClass = page === "dashboard" ? "active" : "";

  return (
    <div id="sidebar" className="active">
      <div className="sidebar-wrapper active">
        <div className="sidebar-header">
          <Link href="/user/dashboard">
            <a className="sidebar-link">Admin</a>
          </Link>
        </div>
        <div className="sidebar-menu">
          <ul className="menu">
            <li className="sidebar-title">Main Menu</li>
            <li className={`sidebar-item ${dashboardClass}`}>
              <Link href="/user/dashboard">
                <a className="sidebar-link">
                  <FeatherIcon icon="home" width={20} />
                  <span>Dashboard</span>
                </a>
              </Link>
            </li>
          </ul>
        </div>
        <button className="sidebar-toggler btn x">
          <FeatherIcon icon="x" />
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
