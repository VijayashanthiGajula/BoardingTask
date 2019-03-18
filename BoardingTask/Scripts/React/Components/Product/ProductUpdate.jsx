import React, { Component } from 'react';

import { Modal, Form, Button } from 'semantic-ui-react';


export default class ProductUpdate extends Component {

    constructor(props) {
        super(props);
        this.state = {

            ProductId: '',
            ProductName: '',
            ProductPrice: '',
        };

        this.onClose = this.onClose.bind(this);
    }
    onClose() {
        this.setState({ showUpdateModel: false });
        window.location.reload()
    }

    render() {
        
        return (
            <React.Fragment>
                
                <Modal open={this.props.showUpdateModel}
                    onClose={this.props.onClose} size='mini'>

                    <Modal.Header> Edit Product </Modal.Header>
                    <Modal.Content>
                        <form className="ui form segment">
                            <Form.Field>
                                <label>Name</label>
                                <input type="text"
                                    name="ProductName"
                                    
                                    defaultValue={this.props.Name}
                                    onChange={this.props.onChange} />
                            </Form.Field>
                            <Form.Field>
                                <label>Price</label>
                                <input type="text"
                                    name="ProductPrice"
                                   
                                    defaultValue={this.props.Price}
                                    onChange={this.props.onChange} />
                            </Form.Field>

                        </form>
                    </Modal.Content>
                    <Modal.Actions>

                        <button className="ui secondary button" onClick={this.props.onClose}>Cancel</button>
                        <button className="ui green button" onClick={this.props.onUpdateSubmit}>Update <i className="check icon"></i></button>
                    </Modal.Actions>
                </Modal>

            </React.Fragment>
        )

    }

}