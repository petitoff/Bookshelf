import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import {User} from "../../types/User";

interface Props {
    user?: User;
    isNewUser?: boolean;
}

const NewUserRedirect = ({ user, isNewUser }: Props) => {
    const history = useHistory();

    useEffect(() => {
        if (isNewUser) {
            history.push("/welcome");
        } else {
            history.push("/")
        }
    }, [history, isNewUser]);

    return null;
};

export default NewUserRedirect;