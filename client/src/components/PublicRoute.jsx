import PropTypes from 'prop-types';
import { Navigate } from "react-router-dom";

const PublicRoute = (props) => {
    if (localStorage.getItem("token")) {
        return <Navigate to="/" />
        
      } else {
        return props.children;
      }
}

PublicRoute.propTypes = {
  children: PropTypes.node,
};

export default PublicRoute;