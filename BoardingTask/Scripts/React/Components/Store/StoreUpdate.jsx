import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Modal, Button, Form } from 'semantic-ui-react';

export default class StoreUpdate extends Component {

    constructor(props) {
        super(props);
        this.state = {

            StoreId: '',
            StoreName: '',
            StoreAddress: '',
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

                <Modal open={this.props.showUpdateModel} onClose={this.props.onClose} size='mini'>

                    <Modal.Header> Edit Store </Modal.Header>
                    <Modal.Content>
                        <form className="ui form segment">
                            <Form.Field>
                                <label>Name</label>
                                <input type="text" name="StoreName"
                                    placeholder={this.props.Name}
                                    defaultValue={this.props.Name} onChange={this.props.onChange} />
                            </Form.Field>
                            <Form.Field>
                                <label>Address</label>
                                <input type="text"
                                    name="StoreAddress"
                                    placeholder={this.props.Address}
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