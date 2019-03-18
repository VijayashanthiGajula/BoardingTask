import React, { Component } from 'react';
import Button from 'semantic-ui-react'; 
import CustomerCreate from './CustomerCreate.jsx';
import CustomerDelete from './CustomerDelete.jsx';
import CustomerUpdate from './CustomerUpdate.jsx';


export default class CustomerTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            CustomerList: [],
            
        }
        this.loadData = this.loadData.bind(this);

            this.handleDelete = this.handleDelete.bind(this);
            this.closeDeleteModal = this.closeDeleteModal.bind(this);

            this.showCreateModal = this.showCreateModal.bind(this);
            this.closeCreateModal = this.closeCreateModal.bind(this);
            this.onChange = this.onChange.bind(this);
            this.showUpdateModel = this.showUpdateModel.bind(this);
            this.closeUpdateModel = this.closeUpdateModel.bind(this);
            this.onUpdateSubmit = this.onUpdateSubmit.bind(this);




        }

        componentDidMount() {
            this.loadData();


        }


        loadData() {

            $.ajax({
                url: "/Customer/GetCustomerList",
                type: "GET",
                success: function (data) { this.setState({ CustomerList: data }) }.bind(this)
            });
            
        }
        //Delete    
        handleDelete(id) {

            this.setState({ showDeleteModal: true });
            this.setState({ deleteId: id });
            $.ajax({
                url: "/Customer/GetDeleteCustomer",
                type: "GET",
                data: { 'id': id },
                success: function (data) {
                    var obj = JSON.parse(data);
                    this.setState({ CustomerId: obj.Id, CustomerName: obj.Name, CustomerAddress: obj.Address })
                }.bind(this)
            })
        }

        closeDeleteModal() {
            this.setState({ showDeleteModal: false });
            window.location.reload()
        }

        //Create
    showCreateModal() {
        this.setState({ showCreateModal: true });
        
        }

        closeCreateModal() {
            this.setState({ showCreateModal: false });
            window.location.reload()
            
        }

        onChange(e) {

            this.setState({ [e.target.name]: e.target.value });
        }

        //Update
        showUpdateModel(id) {
            this.setState({ showUpdateModel: true });
            this.setState({ updateId: id });

            $.ajax({
                url: "/Customer/GetEdit",
                type: "GET",
                data: { 'id': id },
                success: function (data) {
                    //this.setState({ CustomerId: data.Id, CustomerName: data.Name, CustomerAddress: data.Address })
                    var obj = JSON.parse(data);
                    this.setState({ CustomerId: obj.Id, CustomerName: obj.Name, CustomerAddress: obj.Address })
                }.bind(this)
            });

        }

        closeUpdateModel() {
            this.setState({ showUpdateModel: false });
            window.location.reload()
        }


        onUpdateSubmit() {


            let data = { Id: this.state.CustomerId, Name: this.state.CustomerName, Address: this.state.CustomerAddress };

            $.ajax({
                url: "/Customer/Edit",
                type: "POST",
                data: data,
                success: function (data) {
                    this.setState({ Success: data })
                    window.location.reload()
                }.bind(this)
            });

        }



        render() {

            let list = this.state.CustomerList;
            console.log(list)
            let tableData = null;
            if (list != "") {

                tableData = list.map(customer =>
                    < tr key={customer.Id}>
                        <td className="four wide">{customer.Name}</td>
                        <td className="four wide">{customer.Address}</td>

                        <td className="four wide">
                           
                            
                            <button className="ui yellow button" onClick={this.showUpdateModel.bind(this, customer.Id)}><i className="edit icon"></i>Edit</button>




                        </td>


                        <td className="four wide">
                            <button className="ui red button" onClick={this.handleDelete.bind(this, customer.Id)} ><i className="delete icon"></i>Delete</button>


                        </td>

                    </tr>
                )
            }
            return (
                <React.Fragment>
                    <div>
                        
                       

                        <CustomerCreate
                            onChange={this.onChange}
                            onClose={this.closeCreateModal}
                            onCreateSubmit={this.onCreateSubmit}
                            showCreateModal={this.state.showCreateModal} />
                        

                        <CustomerDelete
                            delete={this.state.deleteId}
                            onClose={this.closeDeleteModal}
                            onDeleteSubmit={this.onDeleteSubmit}
                            showDeleteModal={this.state.showDeleteModal}
                            Id={this.state.CustomerId}
                            Name={this.state.CustomerName}
                            Address={this.state.CustomerAddress} />

                        <CustomerUpdate
                            onChange={this.onChange}
                            update={this.state.updateId}
                            onClose={this.closeUpdateModel}
                            onUpdateSubmit={this.onUpdateSubmit}
                            showUpdateModel={this.state.showUpdateModel}
                            Id={this.state.CustomerId}
                            Name={this.state.CustomerName}
                            Address={this.state.CustomerAddress} />





                        <table className="ui striped table">
                            <thead>
                                <tr>
                                    <th className="four wide">Name</th>
                                    <th className="four wide">Address</th>
                                    <th className="four wide">Actions</th>
                                    <th className="four wide">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {tableData}
                            </tbody>
                        </table>

                    </div>
                </React.Fragment >
            )

        }
    }
