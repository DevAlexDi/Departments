import React from 'react';
import axios from 'axios';
import './modal.css';

function errorToMsg (object){
    let msg = '';
    for(let key in object){
        msg = key+': ' + object[key]
    }
    return msg;
}

class Modal extends React.Component  {

    state = {
        department: {
            id: null,
            internal:true,
            name: ''
        },
        submitMsg:''
    };

    componentWillMount(){
        this.setState({
            department: this.props.department ?
                this.props.department
                :
                {
                    internal:true,
                    name: ''
                }
        });
    }

    handleChange = (e) =>{
        const formControls = {...this.state.department};

        switch (e.target.name) {
            case 'name':
                formControls[e.target.name] = e.target.value;
                break;
            case 'internal':
                formControls[e.target.name] = JSON.parse(e.target.value);
                break;
            default:
        }
    
        this.setState({
            department: formControls
        });
    }

    

    sendform = (e) => {
        e.preventDefault();

        const params = {
            name: this.state.department.name,
            internal: this.state.department.internal
        } 
 
        if(this.props.department){
            axios.put('http://13.59.6.200/api/v1/departments/'+ this.state.department.id, { department: params }).then(
                (res)=>{
                    if(res.data.status === 'error'){
                        this.setState({
                            submitMsg: errorToMsg(res.data.errors)
                        });
                    }
                    else{
                        this.setState({
                            submitMsg: res.data.flash_message
                        });
                        this.props.getDepartmentsList();
                    }
                }
            );
        }
        else {
            axios.post('http://13.59.6.200/api/v1/departments', { department: params }).then(
                (res)=>{
                    if(res.data.status === 'error'){
                        this.setState({
                            submitMsg: errorToMsg(res.data.errors)
                        });
                    }
                    else{
                        this.setState({
                            submitMsg: res.data.flash_message
                        });
                        this.props.getDepartmentsList();
                    }
                }
            ); 
        }   
    }

    render(){
        return (
            <div className="modal">
                <div className="modal-body">
                    <button onClick={this.props.closeModal}>Close Modal</button>
                    <form onSubmit={this.sendform}>
                        <p>Edit department:</p>
                        <input
                            type="text"
                            value={this.state.department.name}
                            placeholder="name"
                            name="name"
                            onChange={ e => this.handleChange(e) }
                        />
                        <select
                            value={this.state.department.internal}
                            name="internal"
                            onChange={ e => this.handleChange(e) }
                            >
                                <option value="true">true</option>
                                <option value="false">false</option>
                        </select>
                        <p>{this.state.submitMsg}</p>
                        <button onClick={ this.sendform } type="submit">Save</button>
                    </form>
                </div>
            </div>
        );
    }
}

export default Modal;