import React from 'react'

export const HandleDateInput = props => {
    const {setStartDate, setEndDate } = props; 
    const handleStartChange = event => {
        const formatDate = new Date(event.target.value.replace(/-/g, '\/'))
        setStartDate(formatDate)
    };  
    const handleEndChange = event => {
        const formatDate = new Date(event.target.value.replace(/-/g, '\/'))
        setEndDate(formatDate)
    }; 

    return (
 
        <div id="nameField-inner">
            <div id="nameZone"><h3>Start Date</h3>
                <input type="date" onChange={handleStartChange} />
            </div>
            <div id="nameZone">
                <h3>End Date</h3>
                <input type="date" onChange={handleEndChange} />
            </div>
        </div>
        ) 
}