import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const AdminRoute = ({ children }) => {
  const { isAuthenticated, isAdmin } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  if (!isAdmin) {
    return <Navigate to="/home" replace />;
  }

  return children;
};

export default AdminRoute;
