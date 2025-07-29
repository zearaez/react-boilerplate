import { useState } from "react";
import { useLogin } from "@/hooks/useAuth";
import { ILogin } from "@/types/login";

const LoginPage = () => {
  const [credentials, setCredentials] = useState<ILogin>({
    email: "",
    password: "",
  });

  const loginMutation = useLogin();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loginMutation.mutate(credentials);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div>
      <h1>Welcome to the Login Page</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={credentials.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={credentials.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" disabled={loginMutation.isPending}>
          {loginMutation.isPending ? "Logging in..." : "Login"}
        </button>
        {loginMutation.isError && (
          <p style={{ color: "red" }}>Login failed. Please try again.</p>
        )}
      </form>
    </div>
  );
};

export default LoginPage;
