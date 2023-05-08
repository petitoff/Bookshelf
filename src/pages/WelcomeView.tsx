import FormCard from "../components/common/FormCard/FormCard";
import useUpdateUser from "../hooks/useUpdateUser";
import {useAppSelector} from "../hooks/hooks";

const WelcomeView = () => {
    const user = useAppSelector(state => state.auth.user)
    const {updateUserPartial} = useUpdateUser();

    const handleFormSubmit = (values: Record<string, string>) => {
        console.debug(values)

        if('name' in values){
            updateUserPartial({name: values.name});
        }
    };

    console.log(user)

    return (
        <div>
            <FormCard title="Add name to your account" buttonText="Set name" subtitle="" inputs={
                [
                    {
                        type: "text",
                        label: "name",
                        defaultValue: ''
                    }
                ]
            } onSubmit={handleFormSubmit}/>
        </div>
    );
};

export default WelcomeView;
