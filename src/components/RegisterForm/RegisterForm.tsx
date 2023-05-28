import useSignup from "../../hooks/authHooks/useSignup";
import AuthForm from "../common/AuthForm/AuthForm";

const RegisterForm = () => {
  const { signup, signupState } = useSignup();

  return (
    <AuthForm
      heading="Register"
      buttonText="Register"
      altText="Already have an account? Login here!"
      altLink="/login"
      confirmPassword={true}
      isLoading={signupState.isLoading}
      onSubmit={(email, password) => signup(email, password)}
    />
  );
};

export default RegisterForm;
