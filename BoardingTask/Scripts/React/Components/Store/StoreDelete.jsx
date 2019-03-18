import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Modal, Button, Form } from 'semantic-ui-react';

export default class StoreDelete extends Component {

   

    constructor(props) {
        super(props);
        this.state = {

        };

        this.onDeleteSubmit = this.onDeleteSubmit.bind(this);
        this.onClose = this.onClose.bind(this);
    }

    onDeleteSubmit(id) {
        $.ajax({
            url: "/Stores/DeleteStore",
            type: "GET",
            data: { 'id': id },
            success: function (data) {
                this.setState({ success: data })
                window.location.reload()
            }.bind(this)
        });
    }

    onClose() {
        this.setState({ showDeleteModal: false });
        //window.location.reload()
    }

    render() {
        return (
            <React.Fragment>

                <Modal open={this.props.showDeleteModal} size="mini">
                    
                    <Modal.Header>Delete Store</Modal.Header>
                    <Modal.Content>
                        <h4>
                            Are you sure you want to delete this?
                        </h4>
                      
                    </Modal.Content>

                    <Modal.Actions>
                        <Button className="ui secondary button" onClick={this.props.onClose} >Cancel
                            </Button>
                        <Button onClick={() => this.onDeleteSubmit(this.props.delete)} className="ui red button">Delete
                            <i className="x icon"></i>
                        </Button>
                    </Modal.Actions>
                </Modal>
            </React.Fragment>
        )
    }
}