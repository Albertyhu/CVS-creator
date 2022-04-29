import React, { useState} from 'react'; 
import { MyContext } from '../../components/contextItem.js'; 
import { genKey } from '../../components/randGen.js';
import './education.css'; 
import '../../styles/button.css'; 
import { EditEducationData } from './editEducationData.js'; 

//A note about readModeArray
//readModeArray is supposed to store boolean value that indicates whether a field in 'read only' or in 'edit' mode
//toggleRead takes advantage of the fact that any index outside the readModeArray will have a value that's undefined
export const DisplaySavedEducation = () => {

    const { getEducation, removeEducation } = React.useContext(MyContext);
    const [readModeArray, setRead] = useState([]); 
    const toggleRead = (index) => {
        var array = [...readModeArray]; 
        if (array[index] === undefined || !array[index])
            array[index] = true;
        else
            array[index] = false; 
        setRead([...array]); 
     }

    const educ = getEducation().map((item, index) => {
        const startingDate = item.startDate.toLocaleDateString()
        const endingDate = item.endDate.toLocaleDateString(); 
        const newKey = genKey(); 
    
        return (<div> 
            {!readModeArray[index] ?
                <div key={newKey} id='displayEducationContainer'>
                    < div id="firstDataField">
                        <div>
                            <h2>School Name: {item.school}</h2>
                        </div>
                        <div id="editingButtonContainer">
                            <div class="editButton" onClick={() => { toggleRead(index) }}>EDIT</div>
                            <div class="removeButton" onClick={() => { removeEducation(index)} }>REMOVE</div>
                        </div>
                    </div >
                    <div id="dataField">
                        <p><b>Title of Study: </b>  {item.studyTitle}</p>

                    </div>
                    <div id="dataField">
                        <p><b>Start Date: </b> {startingDate}</p>

                    </div>
                    <div id="dataField">
                        <p><b>End Date: </b> {endingDate}</p>

                    </div>
                </div >
                :
                <EditEducationData
                    toggleEdit={toggleRead}
                    school={item.school}
                    study={item.studyTitle}
                    startDate={item.startDate}
                    endDate={item.endDate}
                    ind={index}
                />
            }</div>)
        })

        return educ; 
    }