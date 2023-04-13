import useLogin from "../../hooks/useLogin";
import AuthForm from "../common/AuthForm/AuthForm";

const LoginForm = () => {
  const { login } = useLogin();

  return (
    <AuthForm
      heading="Login"
      buttonText="Login in"
      altText="Don't have an account? Create here!"
      altLink="/signup"
      onSubmit={(email, password) => login(email, password)}
    />
  );
};

export default LoginForm;
