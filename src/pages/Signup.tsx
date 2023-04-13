import RegisterForm from "../components/RegisterForm/RegisterForm";
import styles from "./Pages.module.scss";

export default function Signup() {
  return (
    <div className={styles.register}>
      <RegisterForm />
    </div>
  );
}
