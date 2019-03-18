import React, { Component } from 'react';
import { Modal, Form, Button } from 'semantic-ui-react';
import ReactDOM from 'react-dom';

import SaleCreate from "./SaleCreate.jsx"
import SaleDelete from "./SaleDelete.jsx"
import SaleEdit from "./SaleEdit.jsx"


export default class Saletable extends Component {
    constructor() {
        super();
        this.state = {
            salelists: [{ Id: '', DateSold: '', CustomerName: '', ProductName: '', StoreName: '' }],
            Id: '',
            ProductId: '',
            StoreId: '',
            CustomerId: '',
            DateSold: '',

        };


        this.loadData = this.loadData.bind(this);

        this.DateConverter = this.DateConverter.bind(this);

        this.handleDelete = this.handleDelete.bind(this);
        this.closeDeleteModal = this.closeDeleteModal.bind(this);
        this.showCreateModel = this.showCreateModel.bind(this);
        this.closeCreateModel = this.closeCreateModel.bind(this);


        this.showUpdateModel = this.showUpdateModel.bind(this);
        this.closeUpdateModel = this.closeUpdateModel.bind(this);
        this.onUpdateSubmit = this.onUpdateSubmit.bind(this);
        this.onChange = this.onChange.bind(this);


    }

    componentDidMount() {
        this.loadData();
    }


    loadData() {

        $.ajax({
            url: "/Sales/GetSalesList",
            type: "GET",
            ContenType: 'application/json',
            success: function (data) { this.setState({ salelists: data }) }.bind(this)
        });
    }
    DateConverter(tempdate) {

        var converted = parseInt((tempdate.replace("/Date(", "").replace(")/", "")))

        var temp = new Date(converted)
        var date = (temp.getFullYear() + "/" + ((temp.getMonth()) + 1) + "/" + temp.getDate())
        return date
        console.log(date);
    }
    //Delete    
    handleDelete(id) {

        this.setState({ showDeleteModal: true });
        this.setState({ deleteId: id });
    }

    closeDeleteModal() {
        this.setState({ showDeleteModal: false });
        window.location.reload()
    }

    //Create
    showCreateModel() {
        this.setState({ showCreateModel: true });
    }

    closeCreateModel() {
        this.setState({ showCreateModel: false });
        window.location.reload()
    }
    onChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }
    //Update
    showUpdateModel(id) {
        this.setState({ showUpdateModel: true });
        this.setState({ updateId: id });


        $.ajax({
            url: "/Sales/GetEdit",
            type: "GET",
            data: { 'id': id },
            success: function (data) {
                var obj = JSON.parse(data);
                this.setState({
                    Id: obj.Id,
                    CustomerId: obj.CustomerId,
                    ProductId: obj.ProductId,
                    StoreId: obj.StoreId,
                    DateSold: this.DateConverter(obj.DateSold)
                               })
            }.bind(this)
            
        });
        
    }

    closeUpdateModel() {
        this.setState({ showUpdateModel: false });
        window.location.reload()
    }


    onUpdateSubmit() {
        let data = {
            'Id': this.state.updateId,
            'ProductId': this.state.ProductId,
            'CustomerId': this.state.CustomerId,
            'StoreId': this.state.StoreId,
            'DateSold': this.state.DateSold,
        };


        $.ajax({
            url: "/Sales/Edit",
            type: "POST",
            data: data,
            success: function (data) {
                this.setState({ Success: data })
                window.location.reload()

            }.bind(this)
        });
    }


    render() {

        let list = this.state.salelists;
        console.log(list);
        let tableData = null;
        if (list != "") {
            tableData = list.map(sale =>
                < tr key={sale.Id}>
                    <td className="two wide">{sale.CustomerName}</td>
                    <td className="two wide">{sale.ProductName}</td>
                    <td className="two wide">{sale.StoreName}</td>
                    <td className="two wide">{this.DateConverter(sale.DateSold)}</td>



                    <td className="four wide">

                        <button className="ui yellow button"
                            onClick={this.showUpdateModel.bind(this, sale.Id)}>
                            <i className="edit icon"></i>Edit</button>
                    </td>

                    <td className="four wide">

                        <div><button
                            onClick={this.handleDelete.bind(this, sale.Id)} className="ui red button">
                            <i className="delete icon"></i>Delete</button></div>
                    </td>

                </tr>
            )
        }
        return (
            <React.Fragment>



                <div>

                    
                    <SaleCreate
                        onChange={this.onChange}
                        onClose={this.closeCreateModel}
                        onCreateSubmit={this.onCreateSubmit}
                        showCreateModel={this.state.showCreateModel} />

                    <SaleDelete
                        delete={this.state.deleteId}
                        onClose={this.closeDeleteModal}
                        onDeleteSubmit={this.onDeleteSubmit}
                        showDeleteModal={this.state.showDeleteModal} />

                    <SaleEdit
                        onChange={this.onChange}
                        update={this.state.updateId}
                        onClose={this.closeUpdateModel}
                        onUpdateSubmit={this.onUpdateSubmit}
                        showUpdateModel={this.state.showUpdateModel}
                        Id={this.state.Id}
                        ProductId={this.state.ProductId}
                        CustomerId={this.state.CustomerId}
                        StoreId={this.state.StoreId}
                        DateSold={this.state.DateSold} />




                    <table className="ui striped table">
                        <thead>
                            <tr>
                                <th className="two wide">Customer</th>
                                <th className="two wide">Product</th>
                                <th className="two wide">Store</th>
                                <th className="three wide">DateSold</th>
                                <th className="three wide">Actions</th>
                                <th className="three wide">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tableData}
                        </tbody>
                    </table>
                </div>
            </React.Fragment>
        )
    }
}

