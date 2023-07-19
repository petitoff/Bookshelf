import { useEffect, useState } from "react";
import { ChangeOrAddUserPhoto } from "../../../components/ChangeOrAddUserPhoto/ChangeOrAddUserPhoto";
import { User } from "../../../types/User";
import { HeaderFormContainer } from "../HeaderFormContainer/HeaderFormContainer";
import styles from "./FirstStepForm.module.scss";
import useUpdateUser from "../../../hooks/dataHooks/userDataHooks/useUpdateUser";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { useAppSelector } from "../../../hooks/hooks";

const FirstStepForm = () => {
  const user = useAppSelector((state) => state.auth.user);

  const [newUser, setNewUser] = useState<Partial<User>>({
    username: "",
  });
  const [isInputError, setIsInputError] = useState(false);

  const { updateUserPartial, error } = useUpdateUser();
  const history = useHistory();

  const handleUpdateUser = () => {
    if (!newUser?.username) {
      toast.error("Please enter a username");
      setIsInputError(true);
      return;
    }

    if (newUser) {
      updateUserPartial(newUser);
    }
  };

  useEffect(() => {
    if (user) {
      setNewUser({ username: user.username || "" });
    }
  }, [user]);

  useEffect(() => {
    if (error === "success") {
      history.push("/welcome/second-step");
    }
  }, [error, history]);

  return (
    <div className={styles["form-container"]}>
      <div className={styles["form-border-container"]}>
        <HeaderFormContainer
          activeStep={0}
          allSteps={2}
          executeUpdateUser={handleUpdateUser}
        />

        <div className={styles["content-container"]}>
          <h2>Create your account</h2>

          <p>Avatar</p>
          <ChangeOrAddUserPhoto />

          <h2>Username</h2>
          <input
            className={isInputError ? styles["input-error"] : ""}
            type="text"
            placeholder="Username"
            value={newUser?.username || ""}
            onChange={(e) => {
              setNewUser({ username: e.target.value });
              setIsInputError(false);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default FirstStepForm;
