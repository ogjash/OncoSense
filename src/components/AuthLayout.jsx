import { Outlet } from 'react-router-dom';

const AuthLayout = () => {
  return (
    <div className="min-h-screen bg-secondary-dark text-white">
      <Outlet />
    </div>
  );
};

export default AuthLayout; 