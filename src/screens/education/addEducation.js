import React from 'react'; 
import { MyContext } from '../../components/contextItem.js'; 
import '../../styles/button.css'

export const AddEducation = props => {
    const { getEducation, setEducation } = React.useContext(MyContext); 
    const { closePanel
    } = props; 

    const [schoolName, setSchool] = React.useState('');
    const [study, setStudy] = React.useState('');
    const [start, setStartDate] = React.useState('');
    const [end, setEndDate] = React.useState(''); 

    const handleSchoolChange = event => {
        setSchool(event.target.value)

    }
    const handleStudyChange = event => {
        setStudy(event.target.value)
    }
    const handleStartChange = event => {
        setStartDate(event.target.value)
    }

    const handleEndChange = event => {
        setEndDate(event.target.value)
    }

    const areDatesValid = () => {
        const startingDate = new Date(start);
        const endingDate = new Date(end)
        return startingDate.getTime() < endingDate.getTime() ? true : false;
    }

    const handleSubmit = () => {

        var isValid = true;
        var errorMessage = "Please, correct the following: \n";
        if (schoolName === '') {
            errorMessage += "Write down your school name.  \n"
            isValid = false
        }
        if (study === '') {
            errorMessage += "Write down the title of your study.  \n";
            isValid = false
        }
        if (!areDatesValid()) {
            errorMessage += "Input the correct starting and ending date of your study.  \n"
            isValid = false
        }

        if (isValid) {
            const data = {
                school: schoolName,
                studyTitle: study,
                startDate: new Date(start.replace(/-/g, '\/')),
                endDate: new Date(end.replace(/-/g, '\/')),
            }
            setEducation(data)

            //reset state to their initial values 
            setSchool('');
            setStudy('');
            setStartDate('');
            setEndDate('');
        }
        else {
            alert(errorMessage);
        }
    }


    return (
        <div id = "AddEducationPanel">
            <div>
                <h3>School Name</h3>
                <input value={schoolName} onChange={handleSchoolChange} />
                <h3>Title of Study</h3>
                <input value={study} onChange={handleStudyChange} />

            </div>
            <div id="nameField-inner">
                <div id="nameZone"><h3>Start Date</h3>
                    <input type="date" onChange={handleStartChange} value={start}/>
                </div>
                <div id="nameZone">
                    <h3>End Date</h3>
                    <input type="date" onChange={handleEndChange} value={end}/>
                </div>
            </div>
            <div class="submitButton" onClick={() => { handleSubmit() }}>SUBMIT</div>
            <div class="cancelButton" onClick={() => { closePanel() }}>CANCEL</div>
        </div>
        )
}