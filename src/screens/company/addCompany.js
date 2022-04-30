import React, { useState, useContext } from 'react';
import '../../styles/form.css';
import './company.css'; 
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { MyContext } from '../../components/contextItem.js';
import { genKey } from '../../components/randGen.js';
import { FaBeer } from 'react-icons/fa';
import { HandleDateInput } from '../../components/handleDate.js'; 
import uniqid from 'uniqid'; 

export const CompanyPanel = props => {
    const { addPracticalExp } = useContext(MyContext); 
    const {closeCompanyPanel, addCompany } = props; 
    const [company, setCompany] = React.useState('');
    const [position, setPosition] = React.useState('');
    const [singleTask, setSingleTask] = React.useState('');
    const [tasks, setTasks] = React.useState([]);
    const [displayAddTaskPanel, setDisplayAddTask] = React.useState(false);
    const [start, setStart] = React.useState('');
    const [end, setEnd] = React.useState('');


    const handleCompanyChange = event => {
        setCompany(event.target.value)
    }

    const handlePositionChange = event => {
        setPosition(event.target.value)
    }

    const areDatesValid = () => {
        return start.getTime() < end.getTime() ? true : false;
    }

    const openAddTaskPanel = () => {
        setDisplayAddTask(true)
    }

    const closeAddTaskPanel = () => {
        setDisplayAddTask(false)
    }

    const handleTaskChange = event => {
        setSingleTask(event.target.value);
    }

    const submitTask = () => {
        if (singleTask !== '') {
            const newTask = {
                task: singleTask,
                id: uniqid(),
            };
            setTasks(prevState => [...prevState, newTask])
            setSingleTask('')
            closeAddTaskPanel();
        }
        else {
            alert("This field cannot be empty.")
        }
    }

    const displayAddTask = () => {
        return (
            <div>
                <h4>New Task</h4>
                <input value={singleTask} onChange={handleTaskChange} id={"taskField"} />
                <div id={"submitTaskButton"} onClick={() => {
                    submitTask();

                }}>Submit</div>
                <div id={"cancelTaskButton"} onClick={() => { closeAddTaskPanel() }}>Cancel</div>
            </div>
        )
    }

    const removeTaskItem = (taskIndex) => {
        const arr = tasks.filter((element, index) => index !== taskIndex);
        setTasks(arr)
    }

    const displayTasks = () => {
        if (tasks.length !== 0) {
            var count = 0;
            var displayEdit = false;
            const renderTasks = tasks.map((item, index) => {
                count++;
                return (
                    <div key={item.id}>
                        <p className='taskListItem'>{count}.) {item.task}</p>
                        <div id='removeTaskButton' onClick={() => removeTaskItem(index)}>Remove</div>
                    </div>
                )
            })
            return renderTasks;
        }

    }

    const handleSubmitCompany = () => {
        var isValid = true; 
        var ErrorMessage = "Please, correct the following issues: \n"; 
        if (company === '') {
            ErrorMessage += "Write down company name. \n"; 
            isValid = false; 
        }
        if (position === '') {
            ErrorMessage += "Write down job title. \n";
            isValid = false; 
        }
        if (!areDatesValid()) {
            ErrorMessage += "The starting date cannot be after the end date. \n";
            isValid = false; 
        }

        if (isValid) {
            const newCompany = {
                companyName: company,
                job: position,
                startDate: start, 
                endDate: end, 
                taskList: [...tasks], 
                id: uniqid(),
            }
       //     addCompany(newCompany); 
            addPracticalExp(newCompany); 
            setCompany('');
            setPosition('');
            setTasks([]); 
            setStart('');
            setEnd(''); 
            closeCompanyPanel();
        }
        else {
            alert(ErrorMessage)
        }

    }

    return (
        <div>
            <div>
                <h3>Company Name</h3>
                <input value={company} onChange={handleCompanyChange} />
            </div>
            <div>
                <h3>Job Title</h3>
                <input value={position} onChange={handlePositionChange} />
            </div>
            <HandleDateInput setStartDate={setStart} setEndDate={setEnd }/>
            <div id='TaskField'>
                {displayTasks()}
            </div>
            <div>
                {displayAddTaskPanel ? displayAddTask() : <div id='AddTaskButton' onClick={() => { openAddTaskPanel() }}>Add Task</div>
                }
            </div>
            <div id="submitButton" onClick={handleSubmitCompany}>Submit</div> 
            <div id="CancelCompanyButton" onClick={() => {closeCompanyPanel()}}>Cancel</div>

        </div>

        )
}