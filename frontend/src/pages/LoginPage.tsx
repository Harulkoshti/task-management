import { useState, type FormEvent } from "react";
import { Link, Navigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { loginUser } from "../redux/authSlice";

export default function LoginPage() {
  const dispatch = useAppDispatch();
  const auth = useAppSelector((state) => state.auth);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  if (auth.token) return <Navigate to="/" replace />;

  const submit = (event: FormEvent) => {
    event.preventDefault();
    void dispatch(loginUser({ email, password }));
  };

  return (
    <section className="auth-card">
      <h1>Login</h1>
      <form onSubmit={submit}>
        <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Email" required />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Password"
          required
        />
        <button disabled={auth.loading} type="submit">
          Sign In
        </button>
      </form>
      {auth.error && <p className="error">{auth.error}</p>}
      <p>
        No account? <Link to="/register">Create one</Link>
      </p>
    </section>
  );
}
