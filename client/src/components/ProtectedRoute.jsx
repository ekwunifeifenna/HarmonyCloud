import PropTypes from 'prop-types';
import { Navigate } from "react-router-dom";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUser } from "../redux/userSlice";
import { useDispatch } from "react-redux";
import axios from "axios";
import { showLoading, hideLoading } from '../redux/alertsSlice';

const ProtectedRoute = (props) => {

    const {user} = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    

    useEffect(() => {
        const getUser = async () => {
            try {
                dispatch(showLoading())
                const response = await axios.post("/api/user/get-user-info-by-id", {token: localStorage.getItem("token")}, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });
    
                dispatch(hideLoading())
                if(response.data.success){
                    dispatch(setUser(response.data.user));
                } else {
                    localStorage.clear()
                    navigate("/login");
                }
                
            } catch (error) {
                dispatch(hideLoading())
                localStorage.clear()
                navigate("/login");
                
                
            }
    
        }
     if(!user){
        getUser();
     }
      
    }, [user, dispatch, navigate]);
    
    if (localStorage.getItem("token")) {
        return props.children;
    } else {
        return <Navigate to="/login" />
    }
}

ProtectedRoute.propTypes = {
  children: PropTypes.node,
};

export default ProtectedRoute;
