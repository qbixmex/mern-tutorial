import {useState, useEffect, FormEvent, ChangeEvent} from "react";
import UserInterface from '../Interfaces/UserInterface';
import {FaSignInAlt} from "react-icons/fa";

type LoginType = {
    email: string,
    password: string
}

const Login = () => {
    const [ formData, setFormData ] = useState<LoginType>({
        email: "sonusbeat@gmail.com",
        password: "hB_2cxhfrrpZpVE"
    });

    const { email, password } = formData;

    const onChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = target;
        setFormData((previousState) => ({
            ...previousState,
            [name]: value
        }));
    };  

    const onSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.table(formData);
        
    };

    return (
        <>
            <section className="heading">
                <h1>Login <FaSignInAlt /></h1>

                <p>Enter your credentials</p>
            </section>

            <section className="form">
                <form onSubmit={onSubmit}>
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
                        <button type="submit" className="btn btn-block">
                            Send
                        </button>
                    </div>
                </form>
            </section>
        </>
    );
}

export default Login;
