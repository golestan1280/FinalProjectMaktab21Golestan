import React, { Component } from 'react';
import { Container, Card, ListGroup, Button, Alert} from 'react-bootstrap';
import axios from 'axios';

class AllMembers extends Component {

    constructor(props) {
        super(props);
        this.state = {
            error: null,
            error1: null,
            error2: null,
            success: null,
            success1: null,
            members: []
        }

        const data = {}
        axios.post('//localhost:3000/allmembers', data)
            .then(response => {
                if (response.data.success) {
                    const members = response.data.content;
                    this.setState({ members });
                } else {
                    this.setState({ error: true })
                }
            })
    }

    Delete = (event) => {
        const data = {
            id: event.currentTarget.id,
            FCM: '1'
        }

        axios.post('//localhost:3000/deleteUser', data)
            .then(response => {
                if (response.data.success) {
                    const { members } = this.state;
                    this.setState({ success1: true,
                        members: members.filter(member => member._id !== data.id) })
                } else {
                    this.setState({ error1: true })
                }
            })
    }

    Reset = (event) => {
        const data = {
            id: event.currentTarget.id,
            FCM: '1'
        }

        axios.post('//localhost:3000/resetPassword', data)
            .then(response => {
                if (response.data.success) {
                    this.setState({ success: true })
                } else {
                    this.setState({ error2: true })
                }
            })
    }

    render() {
        const { members } = this.state;
        return (
            <div style={{ paddingTop: 60 }}>
                <Container>

                    {this.state.success &&
                        <Alert variant="success"> The password reset successfully into phone number </Alert>}

                    {this.state.success1 &&
                        <Alert variant="success"> The user delete successfully! </Alert>}

                    {this.state.error &&
                        <Alert variant="danger"> Show Members Failed! </Alert>}

                    {this.state.error1 &&
                        <Alert variant="danger"> Delete Member Failed! </Alert>}

                    <h2 style={{ paddingBottom: 40 }}>All Users</h2>

                    {members.map(member => {
                        return <Card className="mb-4" style={{ borderColor: 'darksalmon' }}>
                            <ListGroup variant="flush">
                                <ListGroup.Item><b>Username:&nbsp;&nbsp;&nbsp;</b>{member.username}</ListGroup.Item>
                                <ListGroup.Item><b>Firstname:&nbsp;&nbsp;&nbsp;</b>{member.firstname}</ListGroup.Item>
                                <ListGroup.Item><b>Lastname:&nbsp;&nbsp;&nbsp;</b>{member.lastname}</ListGroup.Item>
                                <ListGroup.Item><b>Sex:&nbsp;&nbsp;&nbsp;</b>{member.sex}</ListGroup.Item>
                                <ListGroup.Item><b>Phone:&nbsp;&nbsp;&nbsp;</b>{member.phone}</ListGroup.Item>
                                <ListGroup.Item><b>Role:&nbsp;&nbsp;&nbsp;</b>{member.role}</ListGroup.Item>
                            </ListGroup>

                            <Card.Footer>
                                <Button onClick={this.Delete} id={member._id} variant="danger" style={{ color: 'white' }}>
                                    Delete User
                                </Button>
                                <Button onClick={this.Reset} id={member._id} variant="success ml-2" style={{ color: 'white' }}>
                                    Reset Password
                                </Button>
                            </Card.Footer>
                        </Card>
                    })}

                </Container>
            </div>
        )
    }
}

export { AllMembers }