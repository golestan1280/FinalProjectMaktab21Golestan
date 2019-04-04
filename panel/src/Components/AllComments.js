import React, { Component } from 'react';
import { Container, Card, Button, Alert } from 'react-bootstrap';
import axios from 'axios';

class AllComments extends Component {

    constructor(props) {
        super(props);
        this.state = {
            error: null,
            error1: null,
            success: null,
            Comments: []
        }

        const data = {}
        axios.post('//localhost:3000/allComments', data)
            .then(response => {
                if (response.data.success) {
                    const Comments = response.data.content;
                    this.setState({ Comments });
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

        axios.post('//localhost:3000/deleteComment', data)
            .then(response => {
                if (response.data.success) {
                    const { Comments } = this.state;
                    this.setState({ success: true ,
                        Comments: Comments.filter(comment => comment._id !== data.id)});
                } else {
                    this.setState({ error1: true })
                }
            })
    }


    render() {
        const { Comments } = this.state;
        return (
            <div style={{ paddingTop: 60 }}>
                <Container>

                    {this.state.success &&
                        <Alert variant="success"> The comment delete successfully! </Alert>}

                    {this.state.error &&
                        <Alert variant="danger"> Show Comments Failed! </Alert>}

                    {this.state.error1 &&
                        <Alert variant="danger"> Delete Comment Failed! </Alert>}

                    <h2 style={{ paddingBottom: 40 }}>All Comments</h2>

                    {Comments.map(comment => {
                        return <Card className="mb-4" style={{ borderColor: 'darksalmon' }}>
                            <Card.Body>
                                <Card.Subtitle className="text-muted">{comment.username}</Card.Subtitle>
                                <Card.Text className="my-2">{comment.text}</Card.Text>
                                <Card.Text className="mb-1 text-muted">Commented on {comment.createDate}</Card.Text>
                                <Card.Text className="mb-1">ID: {comment._id}</Card.Text>
                            </Card.Body>

                            <Card.Footer>
                                <Button onClick={this.Delete} id={comment._id} variant="danger" style={{ color: 'white' }}>
                                    Delete Comment
                                </Button>

                            </Card.Footer>
                        </Card>
                    })}

                </Container>
            </div>
        )
    }
}

export { AllComments }

