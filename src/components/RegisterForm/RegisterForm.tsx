import useSignup from "../../hooks/useSignup";
import AuthForm from "../common/AuthForm/AuthForm";

const RegisterForm = () => {
  const { signup } = useSignup();

  return (
    <AuthForm
      heading="Register"
      buttonText="Register"
      altText="Already have an account? Login here!"
      altLink="/login"
      onSubmit={(email, password) => signup(email, password)}
    />
  );
};

export default RegisterForm;
