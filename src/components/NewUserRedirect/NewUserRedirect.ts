import {useEffect} from "react";
import {useHistory} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../hooks/hooks";
import {setIsNewUser} from "../../store/slices/authSlice";

const NewUserRedirect = () => {
    const user = useAppSelector((state) => state.auth.user);
    const isNewUser = useAppSelector((state) => state.auth.isNewUser);
    const history = useHistory();
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (user && !user?.name) {
            dispatch(setIsNewUser(true))
            history.push("/welcome");
        } else {
            dispatch(setIsNewUser(false))
        }
    }, [user, isNewUser, history, dispatch]);

    return null;
};

export default NewUserRedirect;
