import { useState } from "react";
import styles from "./RegisterForm.module.css";
import useSignup from "../../../hooks/useSignup";
import { Link } from "react-router-dom";

const RegisterForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signup } = useSignup();

  const handleSubmit = (e: any) => {
    e.preventDefault();

    signup(email, password);
  };

  return (
    <div className={styles.registerForm}>
      <form className={styles.form}>
        <p className={styles.heading}>Register</p>
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
        <Link to={"/login"} className={styles.link}>
          <p>Already have an account? Login here!</p>
        </Link>
        <button onClick={handleSubmit} className={styles.btn}>
          Register
        </button>
      </form>
    </div>
  );
};

export default RegisterForm;
