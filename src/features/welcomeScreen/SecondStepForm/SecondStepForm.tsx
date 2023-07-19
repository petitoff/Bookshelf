import { useEffect, useState } from "react";
import styles from "./SecondStepForm.module.scss";
import { HeaderFormContainer } from "../HeaderFormContainer/HeaderFormContainer";
import useUpdateUser from "../../../hooks/dataHooks/userDataHooks/useUpdateUser";
import { User } from "../../../types/User";
import { ListOfCategoriesOfBook } from "./ListOfCategoriesOfBook/ListOfCategoriesOfBook";
import { BookCategory } from "../../../types/Book";
import { useHistory } from "react-router-dom";

export const SecondStepForm = () => {
  // const [newUser, setNewUser] = useState<Partial<User>>();
  const [selectedCategories, setSelectedCategories] = useState<BookCategory[]>(
    []
  );

  const { updateUserPartial, error } = useUpdateUser();
  const history = useHistory();

  const handleUpdateUser = () => {
    if (selectedCategories) {
      const newUser: Partial<User> = {
        favouriteCategories: selectedCategories,
      };

      updateUserPartial(newUser);
    }
  };

  useEffect(() => {
    if (error === "success") {
      history.push("/welcome/registration-thank-you");
    }
  }, [error, history]);

  return (
    <div className={styles["form-container"]}>
      <div className={styles["form-border-container"]}>
        <HeaderFormContainer
          activeStep={1}
          allSteps={2}
          executeUpdateUser={handleUpdateUser}
        />

        <div className={styles["content-container"]}>
          <h2>Select what you love</h2>
          <p>Select your favorite's categories of book</p>

          <ListOfCategoriesOfBook
            selectedCategories={selectedCategories}
            onSelectedCategoriesChange={setSelectedCategories}
          />
        </div>
      </div>
    </div>
  );
};
