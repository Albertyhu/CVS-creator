import React, { useState} from 'react'; 
import { MyContext } from '../../components/contextItem.js'; 
import { genKey } from '../../components/randGen.js';
import './education.css'; 
import '../../styles/button.css'; 
import { EditEducationData } from './editEducationData.js'; 

 export const DisplaySavedEducation = () => {
     const { getEducation, removeEducation } = React.useContext(MyContext); 
     const [readMode, setReadMode] = useState(true); 

     const toggleEdit = () => {
         setReadMode(!readMode)
     }

    const educ = getEducation().map((item, index) => {
        const startingDate = item.startDate.toLocaleDateString()
        const endingDate = item.endDate.toLocaleDateString()
        const newKey = genKey(); 
        return (<div> 
            {readMode ?
                <div key={newKey} id='displayEducationContainer'>
                    < div id="firstDataField">
                        <div>
                            <p><b>School Name: </b> {item.school}</p>
                        </div>
                        <div id="editingButtonContainer">
                            <div class="editButton" onClick={() => { toggleEdit() }}>EDIT</div>
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
                    toggleEdit={toggleEdit}
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