import { useAppDispatch } from '@/store/hooks/hooks';
import { clearToken } from '@/store/slice/authSlice';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(clearToken());
    navigate('/login');
  };
  return (
    <>
      <p>Home Page</p>
      <button onClick={handleLogout}>Log Out</button>
    </>
  );
};

export default Home;
