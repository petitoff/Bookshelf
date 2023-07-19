import { useHistory } from "react-router-dom";
import styles from "./RegistrationThankYou.module.scss";

export const RegistrationThankYou = () => {
  const history = useHistory();

  return (
    <div className={styles["form-container"]}>
      <div className={styles["form-border-container"]}>
        <div className={styles["form-header"]}>
          <h2>Welcome 🎉</h2>
          <button onClick={() => history.push("/")}>Complete</button>
        </div>
        <div className={styles["horizontal-line"]} />

        <div className={styles["contant-container"]}>
          <h2>Thank you for registration ❤️</h2>

          <p>
            We're thrilled to have you with us. You've just opened the door to a
            world of new reading experiences. Explore, enjoy, and share your
            journey with others. Let's start this reading adventure together!
          </p>
        </div>
      </div>
    </div>
  );
};
