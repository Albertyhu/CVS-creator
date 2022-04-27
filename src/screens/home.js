import React from 'react'; 
import '../styles/home.css';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import EducationalInfo from './educationalInfo.js';
import GeneralInfo from './generalInfo.js';
import PracticalInfo from './practicalInfo.js'; 

const Home = () => {
    return (
        <div id="homeContainer">
            <h2 id = "title">Make an impression with your work history</h2> 

            <Link to = "/generalInfo"><div id="startButton">START HERE</div></Link>
        </div>

    ); 

}

export default Home; 