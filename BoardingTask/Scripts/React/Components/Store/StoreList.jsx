import React, { Component } from 'react';
import StoreCreate from './StoreCreate.jsx';
import StoreDelete from './StoreDelete.jsx';
import StoreUpdate from './StoreUpdate.jsx';


export default class StoreTable extends Component {

    constructor(props) {
        super(props);
        this.state = {
            StoresList: [],
        };

        this.loadData = this.loadData.bind(this);

        this.handleDelete = this.handleDelete.bind(this);
        this.closeDeleteModal = this.closeDeleteModal.bind(this);

        this.showCreateModal = this.showCreateModal.bind(this);
        this.onClose = this.onClose.bind(this);
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
                url: "/Stores/GetStoresList",
                type: "GET",
                success: function (data) { this.setState({ StoresList: data }) }.bind(this)
            });

        }
        //Delete    
        handleDelete(id) {

            this.setState({ showDeleteModal: true });
            this.setState({ deleteId: id });

            $.ajax({
                url: "/Stores/GetDeleteStore",
                type: "GET",
                data: { 'id': id },
                success: function (data) {
                    //this.setState({ StoreId: data.Id, StoreName: data.Name, StoreAddress: data.Address })
                    var obj = JSON.parse(data);
                    this.setState({ StoreId: obj.Id, StoreName: obj.Name, StoreAddress: obj.Address })
                }.bind(this)
            });

        }

        closeDeleteModal() {
            this.setState({ showDeleteModal: false });
            //window.location.reload()
        }

        //Create
    showCreateModal() {
            this.setState({ showCreateModal: true });

        }

    onClose() {
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
                url: "/Stores/GetEdit",
                type: "GET",
                data: { 'id': id },
                success: function (data) {
                    
                    //this.setState({ StoreId: data.Id, StoreName: data.Name, StoreAddress: data.Address })
                    var obj = JSON.parse(data);
                    this.setState({ StoreId: obj.Id, StoreName: obj.Name, StoreAddress: obj.Address })
                   
                }.bind(this)
            });


        }

        closeUpdateModel() {
            this.setState({ showUpdateModel: false });
            window.location.reload()
        }


        onUpdateSubmit() {


            let data = { Id: this.state.StoreId, Name: this.state.StoreName, Address: this.state.StoreAddress };
            console.log(data);
            $.ajax({
                url: "/Stores/Edit",
                type: "POST",
                data: data,
                success: function (data) {
                    this.setState({ Success: data })
                    window.location.reload()
                }.bind(this)
            });

        }



        render() {

            let list = this.state.StoresList;
            console.log("list rendered to table")
            let tableData = null;
            if (list != "") {

                tableData = list.map(Store =>
                    < tr key={Store.Id}>
                        <td className="four wide">{Store.Name}</td>
                        <td className="four wide">{Store.Address}</td>

                        <td className="four wide">


                            <button className="ui yellow button"
                                onClick={this.showUpdateModel.bind(this, Store.Id)}>
                                <i className="edit icon"></i>Edit</button>




                        </td>


                        <td className="four wide">
                            <button className="ui red button" onClick={this.handleDelete.bind(this, Store.Id)} >
                                <i className="delete icon"></i>Delete</button>


                        </td>

                    </tr>
                )
            }
            return (
                <React.Fragment>
                    <div>



                        <StoreCreate
                            onChange={this.onChange}
                            onClose={this.onClose}
                            onCreateSubmit={this.onCreateSubmit}
                            showCreateModel={this.state.showCreateModel} />


                        <StoreDelete
                            delete={this.state.deleteId}
                            onClose={this.closeDeleteModal}
                            onDeleteSubmit={this.onDeleteSubmit}
                            showDeleteModal={this.state.showDeleteModal}
                            Id={this.state.StoreId}
                            Name={this.state.StoreName}
                            Address={this.state.StoreAddress} />

                        <StoreUpdate
                            onChange={this.onChange}
                            update={this.state.updateId}
                            onClose={this.closeUpdateModel}
                            onUpdateSubmit={this.onUpdateSubmit}
                            showUpdateModel={this.state.showUpdateModel}
                            Id={this.state.StoreId}
                            Name={this.state.StoreName}
                            Address={this.state.StoreAddress} />





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
