import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CreateAccount from './createAccount'
import Login from './login'
import Home from './home';
import Navbar from './navbar';
import CourseList from './courseList';
import SavedCourses from './savedCourses'
import CourseMaterials from './courseMaterials'

function Router() {
    let body = (
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/createAccount" element={<CreateAccount />} />
                <Route path="/login" element={<Login />} />
                <Route path="/courseList" element={<CourseList />} />
                <Route path="/savedCourses" element={<SavedCourses />} />
                <Route path="/courseMaterials" element={<CourseMaterials />} />
            </Routes>
        </BrowserRouter>
    )

    return <div id='Router'>
        {body}
    </div>
}

export default Router;