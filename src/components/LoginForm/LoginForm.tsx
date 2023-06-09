import useLogin from "../../hooks/authHooks/useLogin";
import AuthForm from "../common/AuthForm/AuthForm";

const LoginForm = () => {
  const { login, loggingInStatus } = useLogin();

  return (
    <AuthForm
      heading="Login"
      buttonText="Log in"
      altText="Don't have an account? Create here!"
      altLink="/signup"
      isLoading={loggingInStatus === "fetching"}
      onSubmit={(email, password) => login(email, password)}
    />
  );
};

export default LoginForm;
