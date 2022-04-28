import React, { useState } from 'react'; 
import { genKey } from '../../components/randGen.js';
import { MyContext } from '../../components/contextItem.js';

export const EditEducationData = props => {
    const { toggleEdit, school, study, startDate, endDate, ind } = props; 
    const { editEducation } = React.useContext(MyContext)
    var pastStart = `${startDate.getFullYear()}`;
    pastStart += startDate.getMonth() < 10 ? `-0${startDate.getMonth() + 1}` : `-${startDate.getMonth() + 1}`;
    pastStart += startDate.getDate() < 10 ? `-0${startDate.getDate()}` : `-${startDate.getDate()}`;

    
    var pastEnd = `${endDate.getFullYear()}`
    pastEnd += endDate.getMonth() < 10 ? `-0${endDate.getMonth() + 1}` : `-${endDate.getMonth() + 1}`;
    pastEnd += endDate.getDate() < 10 ? `-0${endDate.getDate()}` : `-${endDate.getDate()}`;

    const [schoolName, setSchoolName] = useState(school); 
    const [study_title, setStudy] = useState(study); 
    const [start, setStart] = useState(pastStart); 
    const [end, setEnd] = useState(pastEnd); 
    const newKey = genKey(); 

    const handleSchoolChange = event => {
        setSchoolName(event.target.value)
    }

    const handleStudyChange = event => {
        setStudy(event.target.value)
    }

    const handleStartChange = event => {
        setStart(event.target.value)
    }

    const handleEndChange = event => {
        setEnd(event.target.value)
    }

    const areDatesValid = () => {
        const startingDate = new Date(start);
        const endingDate = new Date(end)
        return startingDate.getTime() < endingDate.getTime() ? true : false;
    }

    const handleSubmit = () => {
        const errorMessage = "Please, correct the following issues in your edit: \n"; 
        var isValid = true; 
        if (schoolName === '') {
            errorMessage += "School name must not be blank. \n";
            isValid = false; 
        }
        if (study_title === '') {
            errorMessage += "Title of study must not be blank. \n";
            isValid = false;
        }
        if (!areDatesValid()) {
            errorMessage += "The starting date cannot be after the ending date of the study. \n";
            isValid = false; 
        }
        if (isValid) {

            const edited = {
                school: schoolName, 
                studyTitle: study_title, 
                startDate: new Date(start.replace(/-/g, '\/')),
                endDate: new Date(end.replace(/-/g,'\/')),
            }
            editEducation(edited, ind)
            toggleEdit(ind); 
        }
        else {
            alert(errorMessage)
        }
    }

    return (
        <div key={newKey} id='displayEducationContainer'>
            < div id="firstDataField" >
                <div>
                    <p><b>School Name: </b> <input value={schoolName} onChange={ handleSchoolChange} /></p>
                </div>
                <div id="editingButtonContainer">
                    <div class="editButton" onClick={() =>handleSubmit()}>SUBMIT</div>
                    <div class="removeButton" onClick={() => { toggleEdit(ind) }}>CANCEL</div>
                </div>
            </div >
            <div id="dataField">
                <p><b>Title of Study: </b><input value={study_title} onChange={ handleStudyChange} /></p>

            </div>
            <div id="dataField">
                <p><b>Start Date: </b> <input type="date" value={start.toLocaleString()} onChange={handleStartChange } /></p>

            </div>
            <div id="dataField">
                <p><b>End Date: </b><input type="date" value={end.toLocaleString()} onChange={ handleEndChange} /></p>

            </div>
        </div >
        )
}