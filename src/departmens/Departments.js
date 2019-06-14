import React from 'react';
import axios from 'axios'
import '../App.css';
import Department from './department/Department';
import Modal from './modal/EditModal';


class Departments extends React.Component {

    state = { 
        departments: [
            {
                id: 1,
                name: "Department 1",
                internal: true,
                created_at: "2019-06-12 14:07:57 UTC"
            },
            {
                id: 2,
                name: "Department 2",
                internal: true,
                created_at: "2019-06-12 14:07:57 UTC"
            },
            {
                id: 3,
                name: "Department 3",
                internal: true,
                created_at: "2019-06-12 14:07:57 UTC"
            },
            {
                id: 4,
                name: "Department 4",
                internal: true,
                created_at: "2019-06-12 14:07:57 UTC"
            }
        ],

        editModal: {
            isShow: false,
            activeDepartment: null
        }
          
    }


    componentDidMount(){
        // axios.get('http://13.59.6.200/api/v1/departments?sort_column=name&sort_direction=asc&page=1&size_per_page=50').then(
        //     (res)=>{
        //         console.log(res);
        //     }
        // );
    }

    openModal = (changingItem) => {
        this.setState((prevstate)=>{
            return {
                editModal: {
                    isShow: !prevstate.editModal.isShow,
                    activeDepartment: changingItem
                }
            }
        });
    }
    

    closeModal = () => {
        this.setState((prevstate)=>{
            return {
                editModal: {
                    isShow: !prevstate.editModal.isShow,
                    activeDepartment: null
                }
            }
        });
    }

    deleteDepartment = (id) => {
        console.log(id);
    }
 

    render(){
        return (
            <div>
                <button onClick={this.openModal.bind(this, null)}>Create Department</button>
                <ul>
                    {
                        this.state.departments.map((item) => {
                            return (
                                <Department 
                                    key = {item.id}
                                    item = {item}
                                    editDepartment = {this.openModal.bind(this,item)}
                                    deleteDepartment = {this.deleteDepartment.bind(this,item.id)}
                                />
                            )
                        })
                    }
                </ul>
                {
                    this.state.editModal.isShow ?
                        <Modal 
                            closeModal = {this.closeModal}
                            department = {this.state.editModal.activeDepartment}
                        />
                        :
                        null
                }
                
            </div>
        );
    }
}

export default Departments;
