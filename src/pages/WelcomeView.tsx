import { useEffect } from "react";
import FormCard from "../components/common/FormCard/FormCard";
import useUpdateUser from "../hooks/dataHooks/userDataHooks/useUpdateUser";
import { useHistory } from "react-router-dom";

interface Props {
  isNewUser?: boolean;
}

const WelcomeView = ({ isNewUser }: Props) => {
  const { updateUserPartial } = useUpdateUser();
  const history = useHistory();

  const handleFormSubmit = (values: Record<string, string>) => {
    console.debug(values);

    if ("name" in values) {
      updateUserPartial({ username: values.name });
    }
  };

  useEffect(() => {
    if (!isNewUser) {
      history.push("/");
    }
  }, [history, isNewUser]);

  return (
    <div>
      <FormCard
        title="Add name to your account"
        buttonText="Set name"
        subtitle=""
        inputs={[
          {
            type: "text",
            label: "name",
            defaultValue: "",
          },
        ]}
        onSubmit={handleFormSubmit}
      />
    </div>
  );
};

export default WelcomeView;
