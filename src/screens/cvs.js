import React from 'react';
import ReactDOM, { Component } from 'react-dom'
import { DisplayCompanyList } from './company/displayCompanyList.js'; 
import { DisplaySavedEducation } from './education/displayEducation.js'; 
import { MyContext } from '../components/contextItem.js'; 
import { genKey } from '../components/randGen.js';
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";


export const DisplayCVS = () => {

    const { getName, setFName, setLName, getPhone, setPhoneNumber } = React.useContext(MyContext); 

    return (
        <div id = "formContainer">
            <div>
            <h1>{getName()}</h1>
            <h3>PhoneNumber</h3>
            <p>{getPhone()}</p>
            </div>
            <div>
                <h2>Educational Background</h2>
                <DisplaySavedEducation />
            </div>
            <div>
                <h2>Practical Experience</h2>
                <DisplayCompanyList />
            </div>
            <div>
            </div>
            <div id="navigationContainer">
                <Link to="/practicalInfo"><div id="backButton">GO BACK</div></Link>
            </div>
        </div>
        )
}