import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Modal, Button, Form } from 'semantic-ui-react';

export default class ProductCreate extends Component {
    constructor() {
        super();
        this.state = {
            ProductName: '',
            ProductPrice: '',
            Success: { Data: '' }

        };
        this.onCreateSubmit = this.onCreateSubmit.bind(this);
         
        this.onChange = this.onChange.bind(this);

    }

    onCreateSubmit() {
        // e.preventDefault();

        let data = { 'Name': this.state.ProductName, 'Price': this.state.ProductPrice };
        console.log(data);
        $.ajax({
            url: "/Product/CreateProduct",
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

    render() {
        return (
            <div  >


                <Modal
                    trigger={<button className="ui primary button"
                        show={this.state.show}
                        onClick={this.showCreateModal}
                        >New Product</button>}

                    open={this.state.showCreateModal}
                    size="small">


                    <Modal.Header> Create Product </Modal.Header>
                    <Modal.Content>
                        <Form className="ui form segment">
                            <Form.Field>
                                <label>Name</label>
                                <input type="text"
                                    name="ProductName"
                                    placeholder='Name'
                                    onChange={this.onChange} />
                            </Form.Field>
                            <Form.Field>
                                <label>Price</label>
                                <input type="text" name="ProductPrice" placeholder='Price' onChange={this.onChange} />
                            </Form.Field>
                        </Form>
                    </Modal.Content>
                    <Modal.Actions>
                        <button className="ui secondary button" onClick={this.props.onClose}>Cancel</button>

                        <button className="ui green button" onClick={this.onCreateSubmit} ><i className="check icon"></i>Create</button>
                    </Modal.Actions>

                </Modal>

            </div>
        )
    }
}