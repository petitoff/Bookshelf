import { useEffect, useState } from "react";
import styles from "./LoginForm.module.css";
import useLogin from "../../../hooks/useLogin";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, isLoggedIn, loginError } = useLogin();

  const handleSubmit = (e: any) => {
    e.preventDefault();

    login(email, password);
  };

  useEffect(() => {
    console.log("isLoggedIn", isLoggedIn);
    if (isLoggedIn) {
      toast.success("Logged in successfully");
    }
  }, [isLoggedIn]);

  useEffect(() => {
    if (loginError) {
      toast.error("Error logging in");
    }
  }, [loginError]);

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
