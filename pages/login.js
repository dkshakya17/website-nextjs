import React from 'react';
import withLayout from '../components/MyLayout';
import Form from "react-bootstrap/Form";
import * as urls from '../components/urls'
import Button from "react-bootstrap/Button";
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import axios from 'axios';
import Cookies from 'universal-cookie';


const cookies = new Cookies();

class AdminLogin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            error: '',
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        axios.post(urls.getLoginPath(), {
            username: this.state.username, 
            password: this.state.password,
        }).then(res => {
            cookies.set('auth_token', res.data.access);
            window.location.href = '/uk/london';
        }).catch(err => {
            err.response 
                ? this.setState({error: err.response.data.detail})
                : console.log(err);
        })
    }

    render = () => {
        return <Card>
            <Card.Header>
                <h3>Sales Login</h3>
            </Card.Header>
            <Card.Body>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Group controlId="formBasicEmail">
                        {/* <Form.Label>Username</Form.Label> */}
                        <Form.Control type="text" placeholder="Enter Username" value={this.state.username} autoFocus={true}
                            onChange={e => this.setState({username: e.target.value})} />
                        <Form.Text className="text-muted">
                            Same as <a href="https://admin.uniacco.com/admin" target="_blank">Inventory Dashboard</a>.
                        </Form.Text>
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword">
                        {/* <Form.Label>Password</Form.Label> */}
                        <Form.Control type="password" placeholder="Password" value={this.state.password} 
                            onChange={e => this.setState({password: e.target.value})} />
                    </Form.Group>
                    <Button variant="primary" type="submit" className='UniAcco_btn primary_color login_btn_shadow explore_btn_wd'>
                        Login
                    </Button>
                    <Form.Text className='mt-3 red'><p>{this.state.error}</p></Form.Text>
                </Form>
            </Card.Body>
        </Card>
    }
}

class Page extends React.Component {
    render() {
        return (
            <Container className='my-5'>
                <Col md={{span: 4, offset: 4}} className='my-5'>
                    <AdminLogin />
                </Col>
            </Container>
        )
    }
}

const pagewithLayout = withLayout(Page);
pagewithLayout.getInitialProps = async ({ req, query }) => {
    return { props: {} }
}

export default pagewithLayout;
