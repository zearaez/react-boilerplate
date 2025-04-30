import { useAppDispatch } from "@/store/hooks/hooks";
import { setAuthTokens } from "@/store/slice/authSlice";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  // const user = useSelector((state: SelectorTypes) => state.user);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const handleLogin = () => {
    // Simulate a login action
    dispatch(
      setAuthTokens({
        token: 'my-access-token',
        refreshToken: 'my-refresh-token',
        user: {
          id: '12345',
          first_name: 'John',
          last_name: 'Doe',
          email: 'john.doe@email.com',
          phone: '123-456-7890',
          created_at: '2023-10-01T12:00:00Z',
          updated_at: '2023-10-01T12:00:00Z',
        },
      })
    );
    navigate('/dashboard');
  }
  return (
    <div>
      <h1>Welcome to the Login Page</h1>
      <button onClick={() => handleLogin()}>Login</button>
    </div>
  );
};

export default LoginPage;
