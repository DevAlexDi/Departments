import React from 'react';
// import axios from 'axios';
import '../App.css';
import Department from './department/Department';
import Modal from './modal/Modal';



class Departments extends React.Component {

    //asc, desc
    //name, created_at
    state = {
        departments: [],
        pageCount: null,
        recordsTotal: null,
        recordsFiltered: 10,
        sortDirection: 'asc',
        sortColumn: 'name',
        isModalOpen: false,
        activeDepartment: null,
        isDepartmentsLoaded: false,
    }

    componentWillMount () {
        
        
    }
    componentDidMount () {
        this.getDepartmentsList();
    }


    getPageCount = (total,Filtered) => {
        const rest = total % Filtered;
        return (Math.floor(total / Filtered) + (+!!rest));
    }

    getDepartmentsList(pageNumber = 1){
        this.loading();
        console.log(this.props.history.location);
        // axios.get('http://13.59.6.200/api/v1/departments?sort_column=name&sort_direction=asc&page=1&size_per_page=50').then(
        //     (res)=>{
                
        //     },
        //     (err)=>{
        //         console.log(err);
        //     }
        // )
        setTimeout(()=>{
            this.setState({
                isDepartmentsLoaded: true,
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
                        internal: false,
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
                    },
                    {
                        id: 5,
                        name: "Department 5",
                        internal: true,
                        created_at: "2019-06-12 14:07:57 UTC"
                    }
                ],
                recordsTotal:5,
                recordsFiltered:2,
                pageCount: this.getPageCount(5,2)
            });

        },2000)
        
    }

    loading(){
        this.setState({
            isDepartmentsLoaded: false,
        });
    }

    openModal = () => {
        this.setState({
            isModalOpen: true,
        });
    }
    

    closeModal = () => {
        this.setState({
            isModalOpen: false,
            activeDepartment: null
        });
    }

    deleteDepartment = (id) => {
        console.log(id);
    }

    editDepartment = (item) => {
        this.openModal();
        this.setState({
            activeDepartment: item,
        })
    }

    setLocation (indexPage) {
        this.props.history.push('/'+indexPage);
        this.getDepartmentsList();
    }

    formFilterChange = (e) => {

        const formControls = {...this.state}

        switch (e.target.name) {
            case 'recordsFiltered':
                formControls[e.target.name] = +e.target.value;
                break;
            case 'sortDirection':
                formControls[e.target.name] = e.target.value;
                break;

            case 'sortColumn':
                formControls[e.target.name] = e.target.value;
                break;
            default:
        }

        this.setState({
            recordsFiltered: formControls.recordsFiltered,
            sortDirection: formControls.sortDirection,
            sortColumn: formControls.sortColumn
        })
        console.log(formControls);

    }

    onFilter = (e) =>{
        e.preventDefault();
        

        
    }
    

    render(){

        return (
            <div>
                
                <button onClick={this.openModal}>Create Department</button>

                <form onSubmit={this.onFilter} className="config-view">
                    <p>size per page</p>
                    <select
                        value={this.state.recordsFiltered}
                        name="recordsFiltered"
                        onChange={ e => this.formFilterChange(e) }
                    >
                        <option value="10">10</option>
                        <option value="15">15</option>
                        <option value="30">30</option>
                    </select>
                    <p>internal</p>
                    <select
                        value={this.state.sortDirection}
                        name="sortDirection"
                        onChange={ e => this.formFilterChange(e) }
                    >
                        <option value="asc">asс</option>
                        <option value="desc">desc</option>
                    </select>
                    <p>sort by</p>
                    <select
                        value={this.state.sortColumn}
                        name="sortColumn"
                        onChange={ e => this.formFilterChange(e) }
                    >
                        <option value="name">name</option>
                        <option value="created_at">created_at</option>
                    </select>
                    <button onSubmit={this.onFilter} type="submit">show</button>
                </form>

            
                {
                this.state.isDepartmentsLoaded ?
                    <div>
                        <ul>
                            {
                            this.state.departments.map((item) => {
                                return (
                                    <Department 
                                        key = {item.id}
                                        item = {item}
                                        editDepartment = {this.editDepartment.bind(this,item)}
                                        deleteDepartment = {this.deleteDepartment.bind(this,item.id)}
                                    />
                                )
                            })
                            }
                        </ul>
                    </div>
                    :
                    <div className="lds-dual-ring"></div>
                }
                {
                this.state.isDepartmentsLoaded ?
                    <ul className="pagination">
                        {
                        [...Array(this.state.pageCount)].map((item,index) => {
                            return (
                                <li key={index}>
                                    <button onClick={this.setLocation.bind(this,index + 1)}>page {index + 1}</button>
                                </li>
                            )
                        })
                        }
                    </ul>
                    :
                    null
                }
            
                
                {
                this.state.isModalOpen ?
                    <Modal 
                        closeModal = {this.closeModal}
                        department = {this.state.activeDepartment}
                    />
                    :
                    null
                }
                
            </div>
        );
    }
}

export default Departments;
