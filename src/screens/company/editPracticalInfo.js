import React, { useState } from 'react';
import { MyContext } from '../../components/contextItem.js';
import { genKey } from '../../components/randGen.js';
import { EditTask } from './editTask.js'; 
import { HandleDateInput } from '../../components/handleDate.js'; 
import "../../styles/button.css";
import "./company.css";

export const EditPractical = props => {
    const { editPractical} = React.useContext(MyContext)
    const { toggleEdit, company, startDate, endDate, job, taskList, ind } = props; 
    const [companyN, setCompany] = useState(company); 
    const [addTaskPanel, setAddTaskPanel] = useState(false); 
    const [newTask, setNewTask] = useState('')

    var formattedStart = `${startDate.getFullYear()}-`
    if (parseInt(startDate.getMonth()) < 10) {
        console.log("starting month: " + parseInt(startDate.getMonth()))
        formattedStart += '0'
    }

    formattedStart += `${startDate.getMonth() + 1}-`

    if (parseInt(startDate.getDate()) < 10) {
        console.log("starting day: " + parseInt(startDate.getdate()))
        formattedStart += '0'
    }
    formattedStart += `${startDate.getDate()}`; 

    var formattedEnd = `${endDate.getFullYear()}-`
    if (parseInt(endDate.getMonth()) < 10) {
        formattedEnd += '0'
    }

    formattedEnd += `${endDate.getMonth() + 1}-`
    if (parseInt(endDate.getDay()) < 10) {
        formattedEnd += '0'
    }
    formattedEnd += `${endDate.getDate()}`; 
    console.log(formattedStart)
    console.log(formattedEnd)

    const [start, setStartDate] = useState(formattedStart);
    const [end, setEndDate] = useState(formattedEnd); 
    const [jobTitle, setJobTitle] = useState(job)
    const [tasks, setTasks] = useState([...taskList]); 

    const handleCompanyChange = event => {
        setCompany(event.target.value)
    }

    const handleStartChange = event => {
        setStartDate(event.target.value)
    }

    const handleEndChange = event => {
        setEndDate(event.target.value)
    }

    const handleJobChange = event => {
        setJobTitle(event.target.value)
    }

    const handleTaskChange = (event, index) => {
        var array = [...tasks]
        array[index] = event.target.value
        setTasks([...array]); 
    }

    const handleAddTask = event => {
        setNewTask(event.target.value)
    }

    const handleSubmitNewTask = () => {
        if (newTask !== "") {
            setTasks(prevState => [...prevState, newTask]); 
            setNewTask(''); 
            toggleTaskPanel(); 
        }
        else {
            alert("You can't leave the new task field blank.");
        }
    }

    const areDatesValid = () => {
        const startingDate = new Date(start); 
        const endingDate = new Date(end)
        return startingDate.getTime() < endingDate.getTime() ? true : false; 
    }

    const toggleTaskPanel = () => {
        setAddTaskPanel(!addTaskPanel); 
    }

    const handleSubmit = () => {
        var errorMessage = "Please, correct the following issues: \n"; 
        var isValid = true; 
        if (companyN === '') {
            errorMessage += "Company name cannot be blank. \n"; 
            isValid = false;
        }
        if (jobTitle === '') {
            errorMessage += "Your job title cannot be blank. \n"; 
            isValid = false; 
        }
        if (!areDatesValid()) {
            errorMessage += "Your starting date of your position cannot be after your ending date. \n"; 
            isValid = false; 
        }
        if (isValid) {
            const newEdit = {
                companyName: companyN,
                job: jobTitle,
                startDate: new Date(start.replace(/-/g, '\/')),
                endDate: new Date(end.replace(/-/g, '\/')),
                taskList: [...tasks],
            }
            editPractical(newEdit, ind)


            toggleEdit(ind); 
        }
        else {
            alert(errorMessage)
        }

    }

    return (
        <div>
            <div key={genKey()} id='displayCompanyField'>
                < div id="firstDataField">
                    <div id="companyNameField">
                        <h2>Company:</h2><input value={companyN} onChange={handleCompanyChange} />
                    </div>
                    <div id="editingButtonContainer">
                        <div className="editButton" onClick={() => {handleSubmit()}}>SUBMIT</div>
                        <div className="removeButton" onClick={() => { toggleEdit(ind) }}>CANCEL</div>
                    </div>
                </div>
                {start && end ?
                    <div>
                        <div>
                            <h3>Start Date</h3>
                            <input type="date" onChange={handleStartChange} value={start}/>
                        </div>
                        <div >
                            <h3>End Date</h3>
                            <input type="date" onChange={handleEndChange} value={end}  />
                        </div>
                    </div>
                    :
                    null
                }
                <div style={{ marginTop: 20, marginBottom: 20, }}><b>Job Title: </b> <input value={jobTitle} onChange={handleJobChange} /></div>
                {tasks.length !== 0 ?
                    <div>
                        <h3>Tasks</h3>
                        {tasks.map((val, index) => {
                            return (
                                <div id="taskData" key={genKey()}>
                                    <b>{ index+1} .) </b>
                                    <input value={val} onChange={(event) => { handleTaskChange(event, index) }} /> 
                                </div>
                                )
                        })}

                    </div>
                    :
                    null
                }
                {addTaskPanel ?
                    <div id="PE-newTaskField">
                        <h4>New Task</h4>
                        <input onChange={handleAddTask} value={newTask} />
                        <div className="minorGreenThreeButton" onClick={handleSubmitNewTask}>SUBMIT TASK</div>
                        <div className="minorDarkButton" onClick={() => toggleTaskPanel()}>CANCEL</div>
                    </div>
                    :
                    <div className="minorGreenOneButton" onClick={() => toggleTaskPanel()}>ADD TASK</div>

                }
                <div>
                </div> 
            </div >
        </div>
    )
}