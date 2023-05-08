import { useState } from "react";
import styles from "./AccountSettings.module.scss";
import { useAppSelector } from "../../hooks/hooks";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faSave } from "@fortawesome/free-solid-svg-icons";
import { User } from "../../types/User";
import { ChangeEvent } from "react";
import useUpdateUser from "../../hooks/useUpdateUser";

type ActiveButton = "My Profile" | "Security";

const AccountSettings = () => {
  const user = useAppSelector((state) => state.auth.user);

  const [activeButton, setActiveButton] = useState<ActiveButton>("My Profile");
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const [name, setName] = useState(user?.username ?? "");
  const [email, setEmail] = useState(user?.email ?? "");

  const {updateUserPartial} = useUpdateUser()

  const handleSaveClick = async () => {
    if (isEditing && user?.UID) {
      const updatedUserData: Partial<User> = {};
      // updatedUserData.UID = user.UID;

      if (name !== user.username || name !== "") {
        updatedUserData.username = name;
      }
      if (email !== user.email || email !== "") {
        updatedUserData.email = email;
      }
      try {
        await updateUserPartial(updatedUserData)

      } catch (error) {
        console.error("Error updating user: ", error);
        // Wyświetl powiadomienie o błędzie dla użytkownika
      }
    }
    setIsEditing(!isEditing);
  };

  const handleChange = (
    event: ChangeEvent<HTMLInputElement>,
    setter: (value: string) => void
  ): void => {
    setter(event.target.value);
  };

  const renderEditButton = () => (
    <button onClick={handleSaveClick} className={styles.editButton}>
      {isEditing ? (
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
  );

  return (
    <div className={styles.container}>
      <div className={styles.buttonList}>
        <button
          className={`${styles.button} ${
            activeButton === "My Profile" && styles.activeButton
          }`}
          onClick={() => setActiveButton("My Profile")}
        >
          My Profile
        </button>
        <button
          className={`${styles.button} ${
            activeButton === "Security" && styles.activeButton
          }`}
          onClick={() => setActiveButton("Security")}
        >
          Security
        </button>
      </div>
      <div className={styles.separator}></div>

      <div className={styles.settingsSection}>
        <h2>{activeButton}</h2>
        {activeButton === "My Profile" ? (
          <div className={styles.section}>
            <div className={styles.sectionLeft}>
              <div className={styles.userImage}>
                <img src={user?.imageUrl ?? ""} alt="user" />
              </div>

              <div>
                <p className={`${styles.paragraphInput} `}>
                  <input
                    type="text"
                    disabled={!isEditing}
                    value={name}
                    onChange={(e) => handleChange(e, setName)}
                    className={`${isEditing && styles.activeInput}`}
                  />
                </p>
              </div>
            </div>
            <div className={styles.sectionRight}>{renderEditButton()}</div>
          </div>
        ) : (
          <div className={styles.section}>
            <div className={styles.sectionLeft}>
              <div>
                <p className={`${styles.paragraphInput} `}>
                  <input
                    type="text"
                    disabled={!isEditing}
                    value={email}
                    onChange={(e) => handleChange(e, setEmail)}
                    className={`${isEditing && styles.activeInput}`}
                  />
                </p>
              </div>
            </div>
            <div className={styles.sectionRight}>{renderEditButton()}</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AccountSettings;
