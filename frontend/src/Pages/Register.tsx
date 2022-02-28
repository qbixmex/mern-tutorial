import {useState, useEffect, FormEvent, ChangeEvent} from "react";
import UserInterface from '../Interfaces/UserInterface';
import {FaUser} from "react-icons/fa";

const Register = () => {
    const [ formData, setFormData ] = useState<UserInterface>({
        name: "Daniel González",
        email: "sonusbeat@gmail.com",
        password: "hB_2cxhfrrpZpVE",
        password_confirmation: "hB_2cxhfrrpZpVE"
    });

    const { name, email, password, password_confirmation } = formData;

    const onChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = target;
        setFormData((previousState) => ({
            ...previousState,
            [name]: value
        }));
    };  

    const onSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    };

    return (
        <>
            <section className="heading">
                <h1><FaUser /> Register</h1>

                <p>Please create an account!</p>
            </section>

            <section className="form">
                <form onSubmit={onSubmit}>
                    <div className="form-group">
                        <input
                            id="name"
                            name="name"
                            type="text"
                            className="form-control"
                            value={name}
                            onChange={onChange}
                            placeholder="Enter your name"
                        />
                    </div>
                    <div className="form-group">
                        <input
                            id="email"
                            name="email"
                            type="email"
                            className="form-control"
                            value={email}
                            onChange={onChange}
                            placeholder="Enter your email"
                        />
                    </div>
                    <div className="form-group">
                        <input
                            id="password"
                            name="password"
                            type="password"
                            className="form-control"
                            value={password}
                            onChange={onChange}
                            placeholder="Enter your password"
                        />
                    </div>
                    <div className="form-group">
                        <input
                            id="password_confirmation"
                            name="password_confirmation"
                            type="password"
                            className="form-control"
                            value={password_confirmation}
                            onChange={onChange}
                            placeholder="Confirm your password"
                        />
                    </div>
                    <div className="form-group">
                        <button type="submit" className="btn btn-block">
                            Send
                        </button>
                    </div>
                </form>
            </section>
        </>
    );
}

export default Register;
