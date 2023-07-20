import styles from "./HeaderFormContainer.module.scss";

interface Props {
  activeStep: number;
  allSteps: number;
  executeUpdateUser: () => void;
}

export const HeaderFormContainer = ({
  activeStep,
  allSteps,
  executeUpdateUser,
}: Props) => {
  return (
    <div className={styles["header-form-container"]}>
      <div className={styles["header-form-container-up"]}>
        <div className={styles.title}>Sign Up</div>
        <div className={styles["rectangle-container"]}>
          {Array.from({ length: allSteps }, (_, i) => (
            <div
              key={i}
              className={
                activeStep === i
                  ? styles["active-rectangle"]
                  : styles["not-active-rectangle"]
              }
            ></div>
          ))}
        </div>
        <div>
          <button className={styles.button} onClick={executeUpdateUser}>
            Continue
          </button>
        </div>
      </div>

      <div className={styles["horizontal-line"]} />
    </div>
  );
};
