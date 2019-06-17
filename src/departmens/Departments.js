import React from 'react';
import axios from 'axios';
import '../App.css';
import Department from './department/Department';
import Modal from './modal/Modal';


class Departments extends React.Component {

    state = {
        departments: [],
        pageCount: null,
        recordsTotal: null,
        sizePerPage: 10,
        sortDirection: 'asc',
        sortColumn: 'name',
        isModalOpen: false,
        activeDepartment: null,
        isDepartmentsLoaded: false,
    }

    componentDidMount () {
        this.getDepartmentsList();
    }

    getPageCount = (total,countPerPage) => {
        const rest = total % countPerPage;
        return (Math.floor(total / countPerPage) + (+!!rest));
    }

    getDepartmentsList(){
        this.loading();
        const pageNum = +this.props.history.location.pathname.slice(1);
        const params = {
            sort_column: this.state.sortColumn,
            sort_direction: this.state.sortDirection,
            page: pageNum,
            size_per_page: this.state.sizePerPage
        }
        axios.get('http://13.59.6.200/api/v1/departments', { params: params }).then(
            (res)=>{
                this.setState({
                    isDepartmentsLoaded: true,
                    departments: res.data.data,
                    recordsTotal:res.data.recordsTotal,
                    pageCount: this.getPageCount(res.data.recordsTotal,this.state.sizePerPage)
                });  
            }
        ); 
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
        axios.delete('http://13.59.6.200/api/v1/departments/'+id).then(
            ()=>{
                this.getDepartmentsList();
            }
        );
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
            case 'sizePerPage':
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
            sizePerPage: formControls.sizePerPage,
            sortDirection: formControls.sortDirection,
            sortColumn: formControls.sortColumn
        },()=>{
            this.props.history.push('/1');
            this.getDepartmentsList();
        });
    }  

    render(){

        return (
            <div>
                <button onClick={this.openModal}>Create Department</button>
                <form className="config-view">
                    <p>size per page</p>
                    <select
                        value={this.state.sizePerPage}
                        name="sizePerPage"
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
                                    <button
                                        className={+this.props.history.location.pathname.slice(1) === (index+1)?'active':null}
                                        onClick={this.setLocation.bind(this,index + 1)}
                                    >
                                        page {index + 1}
                                    </button>
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
                        getDepartmentsList = {this.getDepartmentsList.bind(this)}
                    />
                    :
                    null
                }
                
            </div>
        );
    }
}

export default Departments;
