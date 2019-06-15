import React from 'react';

function transformDate (date){
    const dateObj = new Date(date);
    const month = dateObj.getUTCMonth() + 1;
    const day = dateObj.getUTCDate();
    const year = dateObj.getUTCFullYear();
    return day + "/" + month + "/" + year ;
}

const Department = (props) =>{
    
    return (
        <li>
            <h5>name: {props.item.name}</h5>
            <p>internal: {props.item.internal.toString()}</p>
            <p>created at: {transformDate(props.item.created_at)}</p>
            <button onClick={props.editDepartment}>Edit</button>
            <button onClick={props.deleteDepartment}>Delete</button>
            <hr />
        </li>
    );
}

export default Department;