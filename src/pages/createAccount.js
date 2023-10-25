import { useState } from "react";
import { Link } from "react-router-dom"
import "./createAccount.css"
import Axios from "axios"


export function isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
}

export function getValidUsername(username) {
    const result = username.replace(/[^a-zA-Z0-9]/gi, '');
    return result;
};

export function isValidUser(user) {
    return /[a-zA-Z0-9!#$%^&*()_]+/.test(user);
}

function CreateAccount() {
    const [user, setUser] = useState("");
    const [email, setEmail] = useState("");

    const [passwordType] = useState("password");
    const [passwordInput, setPasswordInput] = useState("");

    const handlePasswordChange = (evnt) => {
        setPasswordInput(evnt.target.value);
        OnInputChange(evnt);
    }

    const addUser = () => {
        if (isValidUser(user)) {
            Axios.get("https://hcd-e14b67ea1cbd.herokuapp.com/check", {
                params: {
                    user: user,
                    email: email,
                }
            }).then((response) => {
                if (response.data && response.data.username) {
                    alert("username already exists")
                } else if (response.data && response.data.email) {
                    alert("email already used")
                } else {
                    Axios.get("https://hcd-e14b67ea1cbd.herokuapp.com/insert", {
                        params: {
                            user: user,
                            email: email,
                            pass: passwordInput,
                        }
                    }).then(() => {
                        alert("inserted")
                    });
                }
            })
        }
    }

    const [message, setMessage] = useState('');
    const [error, setError] = useState(null);

    const handleChange = event => {
        if (!isValidEmail(event.target.value)) {
            setError('Email is invalid');
        } else {
            setError(null);
        }

        setMessage(event.target.value);
    };



    const [input, setInput] = useState({
        username: '',
        password: '',
        confirmPassword: ''
    });

    const [err, setErr] = useState({
        username: '',
        password: '',
        confirmPassword: ''
    })

    const OnInputChange = e => {
        const { name, value } = e.target;
        setInput(prev => ({
            ...prev,
            [name]: value
        }));
        validateInput(e);
    }

    const validateInput = e => {
        let { name, value } = e.target;
        setErr(prev => {
            const stateObj = { ...prev, [name]: "" };

            switch (name) {
                case "username":
                    if (!value) {
                        stateObj[name] = "Please enter Username.";
                    }
                    break;

                case "password":
                    if (!value) {
                        stateObj[name] = "Please enter Password.";
                    } else if (input.confirmPassword && value !== input.confirmPassword) {
                        stateObj["confirmPassword"] = "Password and Confirm Password does not match.";
                    } else {
                        stateObj["confirmPassword"] = input.confirmPassword ? "" : err.confirmPassword;
                    }
                    break;

                case "confirmPassword":
                    if (!value) {
                        stateObj[name] = "Please enter Confirm Password.";
                    } else if (input.password && value !== input.password) {
                        stateObj[name] = "Password and Confirm Password does not match.";
                    }
                    break;

                default:
                    break;
            }

            return stateObj;
        });
    }



    const passwordOnChange = (event) => {
        setUser(getValidUsername(event.target.value));
        OnInputChange(event);
    };

    return (
        <main>
            <div className="accountBox">
                <h3>Create Account</h3>
                {err.username && (
                    <span className="err" style={{ color: "red" }}>
                        {err.username}
                    </span>
                )}

                <input
                    type="text"
                    className="inputBox"
                    name="username"
                    placeholder="Create Username"
                    value={user}
                    onChange={(event) => passwordOnChange(event)}
                    onBlur={validateInput}
                />
                <br></br>
                {error && <text style={{ color: "red" }}>{error}</text>}
                <input
                    className="inputBox"
                    placeholder="Enter your Email"
                    value={message}
                    onChange={(event) => {
                        handleChange(event);
                        setEmail(event.target.value);
                    }}
                />

                {err.password && (
                    <span className="err" style={{ color: "red" }}>
                        {err.password}
                    </span>
                )}
                <input
                    type={passwordType}
                    onChange={handlePasswordChange}
                    value={passwordInput}
                    name="password"
                    className="inputBox"
                    placeholder="Password"
                />

                {err.confirmPassword && (
                    <span className="err" style={{ color: "red" }}>
                        {err.confirmPassword}
                    </span>
                )}
                <input
                    type={passwordType}
                    name="confirmPassword"
                    value={input.confirmPassword}
                    onChange={OnInputChange}
                    onBlur={validateInput}
                    className="inputBox"
                    placeholder="Confirm Password"
                />
                <button className="submit" onClick={addUser}>
                    Submit
                </button>
                <p>
                    Already have an account? <Link to="/login">Login</Link>
                </p>
            </div>
        </main>
    );

}

export default CreateAccount;