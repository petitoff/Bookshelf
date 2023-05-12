import React, { useState } from "react";
import styles from "./AuthForm.module.scss";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { isPasswordValid } from "../../../utils/passwordValidation";
import LoadingIndicator from "../LoadingIndicator/LoadingIndicator";

interface Props {
  heading: string;
  buttonText: string;
  altText: string;
  altLink: string;
  confirmPassword?: boolean;
  isLoading?: boolean;
  onSubmit: (email: string, password: string) => void;
}

const AuthForm = ({
  heading,
  buttonText,
  altText,
  altLink,
  confirmPassword,
  isLoading,
  onSubmit,
}: Props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPasswordValue, setConfirmPasswordValue] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    if (isLoading)
      return toast.error("Please wait for the current action to finish");

    e.preventDefault();
    if (confirmPassword && password !== confirmPasswordValue) {
      toast.error("Passwords do not match");
      return;
    }
    if (!isPasswordValid(password, 8)) {
      toast.error("Password must be at least 8 characters long");
      return;
    }
    onSubmit(email, password);
  };

  return (
    <div className={styles.authForm}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <p className={styles.heading}>{heading}</p>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className={styles.input}
          placeholder="Email"
          type="email"
        />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className={styles.input}
          placeholder="Password"
          type="password"
        />
        {confirmPassword && (
          <input
            value={confirmPasswordValue}
            onChange={(e) => setConfirmPasswordValue(e.target.value)}
            required
            className={styles.input}
            placeholder="Retype password"
            type="password"
          />
        )}
        <Link to={altLink} className={styles.link}>
          <p>{altText}</p>
        </Link>

        {isLoading && <LoadingIndicator />}

        <button type="submit" className={styles.btn} disabled={isLoading}>
          {buttonText}
        </button>
      </form>
    </div>
  );
};

export default AuthForm;
