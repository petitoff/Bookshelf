import { useState } from "react";
import styles from "./LoginForm.module.css";
import useLogin from "../../../hooks/useLogin";
import "react-toastify/dist/ReactToastify.css";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useLogin();

  const handleSubmit = (e: any) => {
    e.preventDefault();

    login(email, password);
  };

  return (
    <div className={styles.loginForm}>
      <form className={styles.form}>
        <p className={styles.heading}>Login</p>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className={styles.input}
          placeholder="Email"
          type="text"
        />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className={styles.input}
          placeholder="Password"
          type="password"
        />
        <button onClick={handleSubmit} className={styles.btn}>
          Login in
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
