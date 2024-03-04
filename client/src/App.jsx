import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { Toaster } from "react-hot-toast";
import Home from "./pages/Home";
import { useSelector } from "react-redux";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";
import ApplyDoctor from "./pages/Admin/ApplyDoctor";
import Notifications from "./pages/Notifications";
import DoctorsList from "./pages/Admin/DoctorsList";
import Userslist from "./pages/Admin/Userslist";
import AddClient from "./pages/Admin/AddClient";


function App() {
  const { loading } = useSelector((state) => state.alerts);
  return (
    <BrowserRouter>
      {loading && (
        <div className="spinner-parent">
          <div className="spinner-border" role="status"></div>
        </div>
      )}
      <Toaster position="top-center" reverseOrder={false} />
      <Routes>
        <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
        <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />
        <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="/admin/apply-doctor" element={<ProtectedRoute><ApplyDoctor /></ProtectedRoute>} />
        <Route path="/admin/add-client" element={<ProtectedRoute><AddClient /></ProtectedRoute>} />
        <Route path="/notifications" element={<ProtectedRoute><Notifications /></ProtectedRoute>} />
        <Route path="/admin/userslist" element={<ProtectedRoute><Userslist /></ProtectedRoute>} />
        <Route path="/admin/doctorslist" element={<ProtectedRoute><DoctorsList /></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
