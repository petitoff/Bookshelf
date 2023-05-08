import React, {useState} from 'react';
import "./FormCard.scss";

interface Props {
    title: string;
    subtitle: string;
    inputs?: Input[];
    buttonText: string;
    footerText?: string;
    onSubmit: (values: Record<string, string>) => void;
}

type Input = {
    type: string;
    defaultValue: string;
    label: string;
}

const FormCard = ({title, subtitle, inputs, buttonText, footerText, onSubmit}: Props) => {
    const [formValues, setFormValues] = useState<Record<string, string>>({});


    const handleChange = (event: React.ChangeEvent<HTMLInputElement>, label: string) => {
        setFormValues(prevValues => ({...prevValues, [label]: event.target.value}));
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        onSubmit(formValues);
    };

    if (!inputs) {
        return null;
    }

    return (
        <div className="container">
            <div className="card">
                <div className="card-image">
                    <h2 className="card-heading">
                        {title}
                        <small>{subtitle}</small>
                    </h2>
                </div>
                <form className="card-form" onSubmit={handleSubmit}>
                    {inputs.map((input, index) => (
                        <div className="input" key={index}>
                            <input
                                type={input.type}
                                className="input-field"
                                defaultValue={input.defaultValue}
                                required
                                onChange={(event) => {
                                    handleChange(event, input.label)
                                }}
                            />
                            <label className="input-label">{input.label}</label>
                        </div>
                    ))}
                    <div className="action">
                        <button type="submit" className="action-button">{buttonText}</button>
                    </div>
                </form>
                {
                    footerText && (
                        <div className="card-info">
                            <p>
                                {footerText}
                            </p>
                        </div>
                    )
                }
            </div>
        </div>
    );
};

export default FormCard;