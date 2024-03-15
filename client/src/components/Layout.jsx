import PropTypes from "prop-types";
import "../styles/layout.css";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Badge } from "antd"; 
import logo from "../assets/HarmonyLogo.png";

const Layout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const location = useLocation();
  const userMenu = [
    {
      name: "Dashboard",
      path: "/",
      icon: "ri-home-line",
    },
    {
      name: "Appointments",
      path: "/appointments",
      icon: "ri-file-list-line",
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


  ];

  const adminMenu = [
    {
      name: "Dashboard",
      path: "/",
      icon: "ri-home-line",
    },

       {
      name: "Therapists",
      path: "/admin/doctorslist",
      icon: "ri-nurse-line"
    },

    {
      name: "Clients",
      path: "/admin/clientslist",
      icon: "ri-service-line",
    },
    {
      name: "Users",
      path: "/admin/userslist",
      icon: "ri-service-line",
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
  ];


  const doctorMenu = [
    {
      name: "Dashboard",
      path: "/",
      icon: "ri-home-line",
    },
    {
      name: "Appointments",
      path: "/appointments",
      icon: "ri-file-list-line",
    },
    {
      name: "profile",
       path: `/doctor/profile/${user?.userId}`,
      // path: `/doctor/profile`,
      icon: "ri-user-line",
    },
    {
      name: "Settings",
      path: "/settings",
      icon: "ri-settings-2-line",
    },

  ]

  // const menuToBeRendered = user?.isAdmin ? adminMenu : user?.isDoctor ? doctorMenu : userMenu;
  const menuToBeRendered = user?.role === 'admin' ? adminMenu : user?.role === 'doctor' ? doctorMenu : userMenu;

  return (
    <div className="main">
      <div className="d-flex layout">
        <div className={`${collapsed ? `collapsed-sidebar` : `sidebar`}`}>
          <div className="sidebar-header">
          <h1 className='logo'>{collapsed ? `HK` : <img src={logo} alt="logo"/>}</h1>
            {/* <h1 className='logo'>{`${collapsed ? `HK` : <img src ={logo} alt="logo"/>}`}</h1> */}
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

            {/**The logout part of the sidebar menu */}
            <div className={`menu-item`} onClick={() => {
              localStorage.clear();
              navigate('/login');
            }}>
              <i className='ri-logout-circle-line'></i>
              {!collapsed && <Link to='/login'>Logout</Link>}
            </div>
          </div>
        </div>

        <div className="content">
          {/**This is the first part of the header */}
          <div className="header">
            {collapsed ? <i
              className="ri-menu-2-line header-action-icon"
              onClick={() => setCollapsed(false)}
            ></i> : <i
              className="ri-close-fill header-action-icon"
              onClick={() => setCollapsed(true)}
            ></i>}

            {/**This is the second part of the header FOR THE NOTIFICATIONS*/}
            <div className="d-flex align-items-center px-3">
              <Badge count={user?.unseenNotifications?.length} onClick={()=>navigate('/notifications')}>
                <i className="ri-notification-line header-action-icon mr-2 px-3"></i>
              </Badge>

              <Link className='anchor mx-3' to='/profile' >{user?.name || (user?.firstName + ' ' + user?.lastName )}</Link>

            </div>




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

export default Layout
