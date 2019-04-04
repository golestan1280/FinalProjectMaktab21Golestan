import React, { Component } from 'react';
import { Tab, Row, Col, Nav, Button } from 'react-bootstrap';
import {AddNewArticle, MyArticle, AllArticle, EditProfile, AllMembers, AllComments} from '../Components';
import axios from 'axios';

class AdminProfilePage extends Component {

    state = {
        profile: []
    }

    logout = () => {
        localStorage.removeItem('adminLoginData');
        window.location = "/";
    }

    componentDidMount() {
        axios.get(`//localhost:3000/myprofile`)
            .then(res => {
                const profile = res.data;
                this.setState({ profile });
            })
    }

    render() {
        return (
                <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                    <Row className="main">
                        <Col sm={3} className="App-header left">
                            <p className="mb-5" style={{fontSize: '20px'}}>
                                Welcome<br/> <span style={{color: 'darksalmon'}}>{this.state.profile.map(profile => profile.firstname +" "+ profile.lastname)}</span> 
                            </p>

                            <Nav variant="pills" className="flex-column mb-5">
                                <Nav.Item>
                                    <Nav.Link className="btn" eventKey="first">All Articles</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link className="btn" eventKey="second">My Articles</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link className="btn" eventKey="third">Add New Article</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link className="btn" eventKey="fourth">Edit Profile</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link className="btn" eventKey="fifth">All Users</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link className="btn" eventKey="sixth">All Comments</Nav.Link>
                                </Nav.Item>
                            </Nav>
                            <Button variant="secondary mt-5" style={{ color: 'white' }} onClick={this.logout}>Logout</Button>
                        </Col>
                        <Col sm={9} className="right">
                            <Tab.Content>
                                <Tab.Pane eventKey="first">
                                    <AllArticle/>
                                </Tab.Pane>

                                <Tab.Pane eventKey="second">
                                    <MyArticle/>
                                </Tab.Pane>

                                <Tab.Pane eventKey="third">
                                    <AddNewArticle/>
                                </Tab.Pane>

                                <Tab.Pane eventKey="fourth">
                                    <EditProfile/>
                                </Tab.Pane>

                                <Tab.Pane eventKey="fifth">
                                    <AllMembers/>
                                </Tab.Pane>

                                <Tab.Pane eventKey="sixth">
                                    <AllComments/>
                                </Tab.Pane>
                            </Tab.Content>
                        </Col>
                    </Row>
                </Tab.Container>


            

        )
    }
}

export { AdminProfilePage }