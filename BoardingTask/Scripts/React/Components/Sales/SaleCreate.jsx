import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Modal, Button, Form } from 'semantic-ui-react';

export default class SaleCreate extends Component {
    constructor() {
        super();
        this.state = {            
            ProductId: '',
            StoreId: '',
            CustomerId: '',
            DateSold: '',

            CustomerDropdownList: [],
            ProductDropdownList: [],
            StoresDropdownList: [],

        };

        this.onCreateSubmit = this.onCreateSubmit.bind(this);
      
        this.onChange = this.onChange.bind(this);

        this.CustomersDropdown = this.CustomersDropdown.bind(this);
        this.ProductsDropdown = this.ProductsDropdown.bind(this);
        this.StoresDropdown = this.StoresDropdown.bind(this);
    }

    componentDidMount() {
        this.CustomersDropdown();
        this.ProductsDropdown();
        this.StoresDropdown();
    }

    onCreateSubmit() {


        let data = {
            'CustomerId': this.state.CustomerId,
            'ProductId': this.state.ProductId,
            'StoreId': this.state.StoreId,
            'DateSold': this.state.DateSold
        };
       

        $.ajax({
            url: "/Sales/CreateSale",
            type: "POST",
            data: data,
            success: function (data) {
                this.setState({ Success: data })

                window.location.reload()
            }.bind(this)
        });
    }


  

    onChange(e) {

        this.setState({ [e.target.name]: e.target.value });
    }

    CustomersDropdown() {
        $.ajax({            
            url: "/Sales/CustomerList",
            type: "GET",

            success: function (data) {
                this.setState({ CustomerDropdownList: data })
            }.bind(this)
        });
        console.log(this.state.CustomerDropdownList);
    }

    ProductsDropdown() {
        $.ajax({
            url: "/Sales/ProductList",
            type: "GET",
            success: function (data) {
                this.setState({ ProductDropdownList: data })
            }.bind(this)
        });
    }

    StoresDropdown() {
        $.ajax({
            url: "/Sales/StoreList",
            type: "GET",
            success: function (data) {
                this.setState({ StoresDropdownList: data })
            }.bind(this)
        });
    }



    render() {
        let CustomerDataList = [{ Id: '', CustomerName: 'Select Customer' }].concat(this.state.CustomerDropdownList)
        let ProductDataList = [{ Id: '', ProductName: 'Select Product' }].concat(this.state.ProductDropdownList)
        let StoreDataList = [{ Id: '', StoreName: 'Select Store' }].concat(this.state.StoresDropdownList)
    
        return (
            <React.Fragment>
                <Modal trigger={<button className="ui primary button"
                    show={this.state.show}
                    onClick={this.props.showCreateModal}
                >New Sale</button>} open={this.props.showCreateModel} onClose={this.props.onClose} size='small'>

                    <Modal.Header> Create Sales </Modal.Header>
                    <Modal.Content>
                        <Form>
                            <Form.Field>
                                <label>Customer Name</label>
                                <select name="CustomerId"
                                    onChange={this.onChange}
                                    value={this.state.CustomerId}>{CustomerDataList.map((Cust) => <option key={Cust.Id}
                                                                            value={Cust.Id}>{Cust.CustomerName}</option>)}
                                </select>

                            </Form.Field>
                            <Form.Field>
                                <label>Product Name</label>
                                <select name="ProductId" onChange={this.onChange} value={this.state.ProductId}>
                                    {ProductDataList.map((Prod) => <option key={Prod.Id} value={Prod.Id}>{Prod.ProductName}</option>)}
                                </select>

                            </Form.Field>
                            <Form.Field>
                                <label>Store Name</label>
                                <select name="StoreId" onChange={this.onChange} value={this.state.StoreId}>
                                    {StoreDataList.map((Str) => <option key={Str.Id} value={Str.Id}>{Str.StoreName}</option>)}
                                </select>

                            </Form.Field>
                            <Form.Field>
                                <label>Date Sold</label>
                                <input type="text" name="DateSold" placeholder='YYYY/MM/DD' onChange={this.onChange} />

                            </Form.Field>
                        </Form>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button onClick={this.props.onClose} secondary >Cancel
                        </Button>
                        <Button onClick={this.onCreateSubmit} className="ui green button">Create
                        <i className="check icon"></i>
                        </Button>
                    </Modal.Actions>
                </Modal>
            </React.Fragment>
        )
    }
}