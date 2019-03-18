import React, { Component } from 'react';

import { Modal, Form, Button } from 'semantic-ui-react';


export default class CustomerUpdate extends Component {

    constructor(props) {
        super(props);
        this.state = {

            CustomerId: '',
            CustomerName: '',
            CustomerAddress: '',
        };

      
    }
    

    render() {
        return (
            <React.Fragment>

                <Modal open={this.props.showUpdateModel} f size='mini'>
                   
                    <Modal.Header> Edit Customer </Modal.Header>
                    <Modal.Content>
                        <form className="ui form segment">
                            <Form.Field>
                                <label>Name</label>
                                <input type="text"
                                    name="CustomerName"
                                    placeholder={this.props.CustomerName}
                                    defaultValue={this.props.Name}
                                    onChange={this.props.onChange} />
                            </Form.Field>
                            <Form.Field>
                                <label>Address</label>
                                <input type="text"
                                    name="CustomerAddress"
                                    placeholder={this.props.CustomerAddress}
                                    defaultValue={this.props.Address}
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