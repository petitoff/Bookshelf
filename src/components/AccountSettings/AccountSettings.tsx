import { useEffect, useState } from "react";
import styles from "./AccountSettings.module.scss";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faSave } from "@fortawesome/free-solid-svg-icons";
import { updateUser } from "../../firebase/services/firestore";
import { User } from "../../types/User";
import { setUser } from "../../store/slices/authSlice";

const AccountSettings = () => {
  const dispatch = useAppDispatch();

  const user = useAppSelector((state) => state.auth.user);

  const [activeButton, setActiveButton] = useState("My Profile");
  const [enabledEdit, setEnabledEdit] = useState(false);
  const [name, setName] = useState("");

  const handleButtonClick = (buttonName: string) => {
    setActiveButton(buttonName);
  };

  const handleEditClick = () => {
    setEnabledEdit(!enabledEdit);

    if (enabledEdit) {
      console.log("Save");

      user?.UID && updateUser(user?.UID, { name } as User);

      dispatch(setUser({ name } as User));
    }
  };

  useEffect(() => {
    setName(user?.name ?? "");
  }, [user?.name]);

  return (
    <div className={styles.container}>
      <div className={styles.buttonList}>
        <button
          className={`${styles.button} ${
            activeButton === "My Profile" && styles.activeButton
          }`}
          onClick={() => handleButtonClick("My Profile")}
        >
          My Profile
        </button>
        <button
          className={`${styles.button} ${
            activeButton === "Security" && styles.activeButton
          }`}
          onClick={() => handleButtonClick("Security")}
        >
          Security
        </button>
      </div>
      <div className={styles.separator}></div>
      <div className={styles.settingsSection}>
        <h2>{activeButton}</h2>

        <div className={styles.section}>
          <div className={styles.sectionLeft}>
            <div className={styles.userImage}>
              <img src={user?.imageUrl ?? ""} alt="user" />
            </div>

            <div>
              <p className={`${styles.paragraphInput} `}>
                <input
                  type="text"
                  disabled={!enabledEdit}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={`${enabledEdit && styles.activeInput}`}
                />
              </p>
            </div>
          </div>
          <div className={styles.sectionRight}>
            <button onClick={handleEditClick} className={styles.editButton}>
              {enabledEdit ? (
                <>
                  <span>Save</span>
                  <FontAwesomeIcon icon={faSave} className={styles.icon} />
                </>
              ) : (
                <>
                  edit
                  <FontAwesomeIcon icon={faEdit} className={styles.icon} />
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountSettings;
