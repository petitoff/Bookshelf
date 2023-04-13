import { useState } from "react";
import styles from "./AuthForm.module.scss";
import { Link } from "react-router-dom";

interface Props {
  heading: string;
  buttonText: string;
  altText: string;
  altLink: string;
  onSubmit: (email: string, password: string) => void;
}

const AuthForm = ({
  heading,
  buttonText,
  altText,
  altLink,
  onSubmit,
}: Props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
        <Link to={altLink} className={styles.link}>
          <p>{altText}</p>
        </Link>
        <button type="submit" className={styles.btn}>
          {buttonText}
        </button>
      </form>
    </div>
  );
};

export default AuthForm;
