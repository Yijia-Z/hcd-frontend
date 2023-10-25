import { useState, React } from "react";
import { Link } from "react-router-dom"
import Axios from "axios"

export function isValidUser(user) {
    return /[a-zA-Z0-9!#$%^&*()_]+/.test(user);
}

function Login() {
    const [user, setUser] = useState("");
    const [passwordType] = useState("password");
    const [passwordInput, setPasswordInput] = useState("");

    const handlePasswordChange = (evnt) => {
        setPasswordInput(evnt.target.value);
    }

    const checkPass = () => {
        if (isValidUser(user)) {
            Axios.get("https://hcd-e14b67ea1cbd.herokuapp.com/pass", {
                params: {
                    user: user,
                },
            }).then((response) => {
                if (response.data && passwordInput === response.data.pass) {
                    localStorage.setItem("username", user);
                    localStorage.setItem("isUserAuthenticated", "true");
                    window.location.reload(false);
                    window.location.pathname = '/courseList'
                } else {
                    alert("Invalid username/password");
                }
            });
        }
    }

    return (
        <main>
            <div className="accountBox">
                <h3>Login</h3>
                <input
                    className="inputBox"
                    type="text"
                    onChange={(event) => {
                        setUser(event.target.value);
                    }}
                    id="username"
                    placeholder="Enter Username"
                />
                <input
                    type={passwordType}
                    onChange={handlePasswordChange}
                    value={passwordInput}
                    id="password"
                    name="password"
                    className="inputBox"
                    placeholder="Enter Password"
                />
                <button
                    className="submit"
                    onClick={() => {
                        checkPass();
                    }}
                >
                    Login
                </button>
                <p>
                    Don't have an account? <Link to="/createAccount">Sign up</Link>
                </p>
            </div>
        </main>
    );

}

export default Login;
