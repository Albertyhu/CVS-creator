import React from 'react';
import '../styles/form.css';
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { MyContext } from '../components/contextItem.js'; 
import { genKey } from '../components/randGen.js';
import { CompanyPanel } from './company/addCompany.js';
import { DisplayCompanyList } from './company/displayCompanyList.js';
const PracticalInfo = () => {
    const [displayCompanyPanel, setDisplayCompany] = React.useState(false)
    const [companyList, setCompanyList] = React.useState([]); 

    const openCompanyPanel = () => {
        setDisplayCompany(true)
    }

    const closeCompanyPanel = () => {
        setDisplayCompany(false)
    }

    const addCompany = (company) => {
        setCompanyList(prevState => [...prevState, company])
    }

    return (
        <div id="formContainer">
            <h2 id="title">Practical Experience</h2>
            {displayCompanyPanel ? <CompanyPanel closeCompanyPanel={closeCompanyPanel} addCompany={addCompany}/>
                :
                <div id='addCompanyButton' onClick={openCompanyPanel}>ADD COMPANY</div>}
            <div id = "blankSpace"></div>
            <DisplayCompanyList />
            <div id="navigationContainer"> 
                <Link to="/educationalInfo"><div id="backButton">GO BACK</div></Link>
                <Link to="/cvs"><div id="nextButton">NEXT</div></Link>
            </div>
        </div>
    )
}

export default PracticalInfo; 