import React from 'react';

const Department = (props) =>{
    return (
        <li>
            <h5>name: {props.item.name}</h5>
            <p>internal: {props.item.internal.toString()}</p>
            <p>created at: {props.item.created_at}</p>
            <button onClick={props.editDepartment}>Edit</button>
            <button onClick={props.deleteDepartment}>Delete</button>
            <hr />
        </li>
    );
}

export default Department;