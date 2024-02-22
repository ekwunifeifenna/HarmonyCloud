import PropTypes from "prop-types";
import "../styles/layout.css";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useState } from "react";

const Layout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const userMenu = [
    {
      name: "Home",
      path: "/",
      icon: "ri-home-line",
    },
    {
      name: "Appointments",
      path: "/appointments",
      icon: "ri-file-list-line",
    },
    {
      name: "Apply Doctor",
      path: "/apply-doctor",
      icon: "ri-hospital-line",
    },
    {
      name: "clients",
      path: "/clients",
      icon: "ri-service-line",
    },
    {
      name: "Medical Records",
      path: "/medical-records",
      icon: "ri-survey-line",
    },
    {
      name: "Billing",
      path: "/billing",
      icon: "ri-bill-line",
    },
    {
      name: "profile",
      path: "/profile",
      icon: "ri-user-line",
    },
    {
      name: "Settings",
      path: "/settings",
      icon: "ri-settings-2-line",
    },

    {
      name: "Logout",
      path: "/logout",
      icon: "ri-logout-box-line",
    },
  ];

  const menuToBeRendered = userMenu;

  return (
    <div className="main">
      <div className="d-flex layout">
        <div className={`${collapsed ? `collapsed-sidebar` : `sidebar`}`}>
          <div className="sidebar-header">
            <h1>Harmony Cloud</h1>
          </div>

          <div className="menu">
            {menuToBeRendered.map((menu, index) => {
              const isActive = location.pathname === menu.path;
              return (
                <div
                  className={`menu-item ${isActive && `active-menu-item`}`}
                  key={index}
                >
                  <i className={menu.icon}></i>
                  {!collapsed && <Link to={menu.path}>{menu.name}</Link>}
                </div>
              );
            })}
          </div>
        </div>

        <div className="content">
          <div className="header">
            {collapsed ?             <i
              className="ri-menu-2-line header-action-icon"
              onClick={() => setCollapsed(false)}
            ></i> :             <i
            className="ri-close-fill header-action-icon"
            onClick={() => setCollapsed(true)}
          ></i>}

          </div>

          <div className="body">{children}</div>
        </div>
      </div>
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node,
};

export default Layout;
