import React from 'react';
import '../styles/form.css';
import '../styles/button.css';
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { MyContext } from '../components/contextItem.js'; 
import { genKey } from '../components/randGen.js';
import { AddEducation } from './education/addEducation.js'; 
import { DisplaySavedEducation } from './education/displayEducation.js'; 

const EducationalInfo = () => {
    const { getEducation, setEducation } = React.useContext(MyContext); 
    const [showAddPanel, setAddPanel] = React.useState(false); 

    const openAddPanel = () => {
        setAddPanel(true)
    } 

    const closeAddPanel = () => {
        setAddPanel(false)
    }

    return (
        <div id="formContainer">
            <h2 id="title">Educational Background</h2>
            {showAddPanel ?
                <AddEducation
                    closePanel={closeAddPanel}

                />
                : 
                <div className="toggleButton" onClick={openAddPanel}>ADD EDUCATION</div>
                }
           
            <DisplaySavedEducation />
            <div id="navigationContainer"> 
                <Link to="/generalInfo"><div id="backButton">GO BACK</div></Link>
                <Link to="/practicalInfo"><div id="nextButton">NEXT</div></Link>
            </div>
        </div>
    )
}

export default EducationalInfo; 