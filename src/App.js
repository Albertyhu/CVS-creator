import React, { Component } from 'react'; 
import Home from './screens/home.js';
import "./styles/app.css"; 
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import GeneralInfo from './screens/generalInfo.js';
import EducationalInfo from './screens/educationalInfo.js';
import PracticalInfo from './screens/practicalInfo.js';
import { DisplayCVS } from './screens/cvs.js';
import { MyContext } from './components/contextItem.js'; 

class App extends React.Component {
    constructor() {
        super(); 
        this.state = {
            cvsFiles: [], 
            firstN: '',
            lastN: '', 
            phone: '', 
            educationalExp: [], 
            practicalExp: [], 

        };

    }

    formFunctions = {
        getName: () => {
            return this.state.firstN + " " + this.state.lastN;
        },
        setFName: (fname) => {
            this.setState({
                firstN: fname,
            })
        },
        setLName: (lname) => {
            this.setState({
                lastN: lname,
            })
        },
        getPhone: () => {
            return this.state.phone; 
        },
        setPhoneNumber: (phoneNumber) => {
            this.setState({phone: phoneNumber})
        },

        setEducation: (education) => {
            this.setState(prevState => ({ educationalExp: [...prevState.educationalExp, education]}))
        },
        editEducation: (education, index) => {            
            var edited = [...this.state.educationalExp]; 
            edited[index].school = education.school; 
            edited[index].studyTitle = education.studyTitle; 
            edited[index].startDate = education.startDate; 
            edited[index].endDate = education.endDate; 
            this.setState({educationalExp: [...edited]})
        }, 
        removeEducation: (ind) => {
            var edited = this.state.educationalExp.filter((currentValue, index) => index !== ind)
            this.setState({educationalExp: [...edited]})
        },
        getEducation: () => {
            return this.state.educationalExp; 

        },
        addPracticalExp: (experience) => {
            this.setState(prevState => ({practicalExp: [...prevState.practicalExp, experience]}))
        },
        getPractical: () => {
            return this.state.practicalExp; 
        },
        removePractical: (ind) => {
            var newArray = this.state.practicalExp.filter((element, index) => index !== ind)
            this.setState({practicalExp: [...newArray]})
        },
        editPractical: (data, ind) => {
            var edited = [...this.state.practicalExp]; 
            edited[ind].companyName = data.companyName;
            edited[ind].job = data.job; 
            edited[ind].startDate = data.startDate;
            edited[ind].endDate = data.endDate; 
            edited[ind].taskList = [...data.taskList]; 
            this.setState({practicalExp: [...edited]})
            
        },
        getCVSFiles: () => {
            return this.state.cvsFiles; 
        }, 
    }
    render() {
        return (
            <div className="App">
                <MyContext.Provider value={this.formFunctions}>
                <Routes>
                    <Route path="/" element={<Home />}></Route>
                    <Route path="/generalInfo" element={<GeneralInfo />}></Route>
                    <Route path="/educationalInfo" element={<EducationalInfo />}></Route>
                    <Route path="/practicalInfo" element={<PracticalInfo />}></Route>
                    <Route path="/cvs" element={<DisplayCVS />}></Route>
                    </Routes>
                 </MyContext.Provider>
            </div>
        )
    }
}

export default App;
