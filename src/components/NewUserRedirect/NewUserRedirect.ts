import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useAppSelector } from "../../hooks/hooks";

const NewUserRedirect = () => {
  const user = useAppSelector((state) => state.auth.user);
  const isNewUser = useAppSelector((state) => state.auth.isNewUser);
  const history = useHistory();

  useEffect(() => {
    if (user && !user?.name && isNewUser) {
      history.push("/welcome");
    }
  }, [user, isNewUser, history]);

  return null;
};

export default NewUserRedirect;
