
import React, { Component } from 'react';
import ProductCreate from './ProductCreate.jsx';
import ProductDelete from './ProductDelete.jsx';
import ProductUpdate from './ProductUpdate.jsx';


export default class ProductTable extends Component
{
    constructor(props) {
        super(props);
        this.state = {
            ProductList: [],


        };

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
            url: "/Product/GetProductList",
            type: "GET",
            success: function (data) { this.setState({ ProductList: data }) }.bind(this)
        });

    }
    //Delete    
    handleDelete(id) {

        this.setState({ showDeleteModal: true });
        this.setState({ deleteId: id });

        $.ajax({
            url: "/Product/GetDeleteProduct",
            type: "GET",
            data: { 'id': id },
            success: function (data) {
                //this.setState({ ProductId: data.Id, ProductName: data.Name, ProductPrice: data.Price })
                var obj = JSON.parse(data);
                this.setState({ ProductId: obj.Id, ProductName: obj.Name, ProductPrice: obj.Price })
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
       // this.setState({ updateId: id });

        $.ajax({
            url: "/Product/GetEdit",
            type: "GET",
            data: { 'id': id },
            success: function (data) {
                 

                var obj = JSON.parse(data);
                this.setState({ ProductId: obj.Id, ProductName: obj.Name, ProductPrice: obj.Price })
                
            }.bind(this)
        });


    }

    closeUpdateModel() {
        this.setState({ showUpdateModel: false });
        window.location.reload()
    }


    onUpdateSubmit() {

        
        let data = { Id: this.state.ProductId, Name: this.state.ProductName, Price: this.state.ProductPrice };

        $.ajax({
            url: "/Product/Edit",
            type: "POST",
            data: data,
            success: function (data) {
                this.setState({ Success: data })
                window.location.reload()
            }.bind(this)
        });

    }



    render() {

        let list = this.state.ProductList;
     
        let tableData = null;
        if (list != "") {

            tableData = list.map(Product =>
                < tr key={Product.Id}>
                    <td className="four wide">{Product.Name}</td>
                    <td className="four wide">{Product.Price}</td>

                    <td className="four wide">


                        <button className="ui yellow button"
                            onClick={this.showUpdateModel.bind(this, Product.Id)}>
                            <i className="edit icon"></i>Edit</button>




                    </td>


                    <td className="four wide">
                        <button className="ui red button" onClick={this.handleDelete.bind(this, Product.Id)} >
                            <i className="delete icon"></i>Delete</button>


                    </td>

                </tr>
            )
        }
        return (
            <React.Fragment>
                <div>



                    <ProductCreate
                        onChange={this.onChange}
                        onClose={this.closeCreateModal}
                        onCreateSubmit={this.onCreateSubmit}
                        showCreateModel={this.state.showCreateModel} />


                    <ProductDelete
                        delete={this.state.deleteId}
                        onClose={this.closeDeleteModal}
                        onDeleteSubmit={this.onDeleteSubmit}
                        showDeleteModal={this.state.showDeleteModal}
                        Id={this.state.ProductId}
                        Name={this.state.ProductName}
                        Address={this.state.ProductPrice} />

                    <ProductUpdate
                        onChange={this.onChange}
                        update={this.state.updateId}
                        onClose={this.closeUpdateModel}
                        onUpdateSubmit={this.onUpdateSubmit}
                        showUpdateModel={this.state.showUpdateModel}
                        Id={this.state.ProductId}
                        Name={this.state.ProductName}
                        Address={this.state.ProductPrice} />





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
