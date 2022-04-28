import React, { useState } from 'react'; 
import { genKey } from '../../components/randGen.js';
import './company.css'; 
import { MyContext } from '../../components/contextItem.js';
import { EditPractical } from './editPracticalInfo.js'; 

const displayTasks = tasks => {

    var count = 0; 
    const list = tasks.map(item => {
        count++; 
        return (<p key={genKey()}>{ count }.) {item}</p>)
        })
        return list;
}

export const DisplayCompanyList = props => {
    const { getPractical, removePractical  } = React.useContext(MyContext); 
    
    const [readMode, setReadMode] = useState([]); 
    const toggleReadMode = (index) => {
        var array = [...readMode]; 
        if (array[index] === undefined || !array[index])
            array[index] = true;
        else
            array[index] = false; 
        setReadMode([...array])
    }

    return (
        <div >
            {  getPractical().map((item, index) => {
                const startingDate = item.startDate.toLocaleDateString()
                const endingDate = item.endDate.toLocaleDateString()
                return (<div key={genKey()}>{
                 !readMode[index] ?
                  <div key={genKey()} id="displayCompanyField">
                        <div id="firstDataField">
                            <div id="companyNameField">
                                <h2>Company: {item.companyName}</h2>
                                {item.startDate && item.endDate ?
                                    <p><b>Date Worked: </b>{item.startDate.toLocaleDateString()} - {item.endDate.toLocaleDateString()}</p>
                                    :
                                    null
                                }
                            </div>
                            <div id="editingButtonContainer">
                                <div class="editButton" onClick={() => toggleReadMode(index)}>EDIT</div>
                                    <div class="removeButton" onClick={() => { removePractical(index) } }>REMOVE</div>
                            </div>
                        </div>
                        <p><b>Job Title: </b> <i>{item.job}</i></p>

                        {item.taskList.length !== 0 ?
                            <div id="displayTaskField">
                                <h4>Tasks</h4>

                                {displayTasks(item.taskList)}

                            </div>
                            :
                             null
                        }

                    </div>
                    :
                        <EditPractical
                            toggleEdit={toggleReadMode}
                            company={item.companyName}
                            startDate={item.startDate}
                            endDate={item.endDate}
                            job={item.job}
                            taskList={item.taskList}
                            ind={index}
                        />  
                }</div>)
                })

            }
            <div id = "blankSpace"></div>
        </div>
        )
}