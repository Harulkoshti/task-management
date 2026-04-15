import { useState, type FormEvent } from "react";
import { Link, Navigate } from "react-router-dom";
import { registerUser } from "../redux/authSlice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";

export default function RegisterPage() {
  const dispatch = useAppDispatch();
  const auth = useAppSelector((state) => state.auth);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  if (auth.token) return <Navigate to="/" replace />;

  const submit = (event: FormEvent) => {
    event.preventDefault();
    void dispatch(registerUser({ email, password }));
  };

  return (
    <section className="auth-card">
      <h1>Register</h1>
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
          Create Account
        </button>
      </form>
      {auth.error && <p className="error">{auth.error}</p>}
      <p>
        Have an account? <Link to="/login">Sign in</Link>
      </p>
    </section>
  );
}
