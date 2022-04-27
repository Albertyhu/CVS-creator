import React from 'react';
import '../styles/form.css';
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import {MyContext} from '../components/contextItem.js'; 
import { formatPhone } from '../components/formatPhone.js';


const GeneralInfo = () => {

    const { getName, setFName, setLName, getPhone, setPhoneNumber } = React.useContext(MyContext); 
    const [firstName, setFirstName] = React.useState(''); 
    const [lastName, setLastName] = React.useState(''); 
    const [phone, setPhone] = React.useState('');
    const [displaySaved, setDisplaySaved] = React.useState(false); 
    const handleFChange = (event) => {
        setFirstName(event.target.value)
    }

    const handleLChange = (event) => {
        setLastName(event.target.value)
    }

    const handlePhoneChange = event => {
            const formatPhoneHandler = formatPhone(event.target.value.toString())
            setPhone(formatPhoneHandler);
    }

    const handleSubmit = () => {
        var errorMessage = 'Error - Please, correct the following: \n'; 
        var isValid = true 
        if (firstName === "") {
            errorMessage += "First name must be written. \n"
            isValid = false;
        }
        if (lastName === "") {
            errorMessage += "Last name must be written. \n"
            isValid = false;
        }
        if (phone === "") {
            errorMessage += "Phone number must be written. \n"
            isValid = false;
        }
        else if (phone.length > 0 && phone.length !== 18) {
            errorMessage += "Phone number must be 10 digits. \n"
            isValid = false;
        }
        if (isValid) {
            setFName(firstName);
            setLName(lastName);
            setPhoneNumber(phone)
            setDisplaySaved(true); 
        }
        else {
            alert(errorMessage  + '\n')
        }
    }

    function displayData() {
        return displaySaved ? <div><h3>Saved Data</h3><div>{getName()}</div><div>{getPhone()}</div></div> : null; 
    }
    return (

            <div id = "formContainer">
            <h2 id="title">General Info</h2>
            <div id='nameField'>
                <div id='nameField-inner'>
                    <div id="nameZone">
                        <h3>First Name</h3>
                        <input id='firstName' value={firstName} onChange={handleFChange} />
                    </div>
                    <div id="nameZone">
                        <h3>Last Name</h3>
                        <input id='lastName' value={lastName} onChange={handleLChange} /> 
                        
                    </div>
                </div>
                <div id="inputField">
                    <h3>Phone Number</h3>
                    <input id="phoneNumber" className="input" onChange={handlePhoneChange} value={'' || phone} />
                </div>
                <div id="submitButton" onClick={() => { handleSubmit() }}>SUBMIT</div>
                {displayData()
                }

            </div>
            <div id = "navigationContainer"> 
                <Link to='/'><div id="backButton">GO BACK</div></Link>
                <Link to="/educationalInfo"><div id="nextButton">NEXT</div></Link>
            </div>
            </div>

    )
}

export default GeneralInfo; 