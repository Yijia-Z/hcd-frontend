import React from 'react';
import { Link } from "react-router-dom";
import "@fontsource/itim"
import "./navbar.css"


const logo = require('../images/logo.jpg')

const Navbar = () => {

    const isAuthenticatedUser = localStorage.getItem("isUserAuthenticated");

    function signout() {
        localStorage.removeItem("isUserAuthenticated")
        window.location.pathname = '/login'

    }


    function account() {
        if (isAuthenticatedUser) {
            return <>
                <Link to="/courseList">Course List</Link>
                <Link to="/savedCourses">Saved Courses</Link>
                <Link to="/courseMaterials">Course Materials</Link>
                <Link to={{}} className="dropdown">Account
                    <div className="dropdown-content">
                        <h5>Username: {localStorage.getItem("username")}</h5>
                    </div>
                </Link>
                <Link onClick={() => { signout(); }}>Signout</Link>
            </>
        }

        return <>
            <Link to="/login">Login</Link>
            <Link to="/createAccount">Sign up</Link>
        </>
    }

    return (
        <header>
            <span className="logo">
                <img src={logo} alt="" />
                <Link to="/"><span id="material">Material</span> <span id="master">Master</span></Link>
            </span>
            <nav>
                {account()}
            </nav>
        </header>
    );
}
export default Navbar;