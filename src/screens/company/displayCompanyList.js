import React from 'react'; 
import { genKey } from '../../components/randGen.js';
import './company.css'; 
import { MyContext } from '../../components/contextItem.js';

const displayTasks = tasks => {

    var count = 0; 
    const list = tasks.map(item => {
        count++; 
        return (<p>{ count }.) {item}</p>)
        })
        return list;
}

export const DisplayCompanyList = props => {
    const { getPractical } = React.useContext(MyContext); 

    return (
        <div >
            {  getPractical().map(item => {
                return (
                    <div key={genKey()} id="displayCompanyField">
                        <div id="companyNameField">
                            <h2>Company: {item.companyName}</h2>
                            {item.startDate && item.endDate ?
                                <p><b>Date Worked: </b>{item.startDate.toLocaleDateString()} - {item.endDate.toLocaleDateString()}</p>
                                :
                                null
                            }
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
                )
            })
            }
            <div id = "blankSpace"></div>
        </div>
        )
}