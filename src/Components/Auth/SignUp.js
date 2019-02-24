import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createUser } from '../../Store/Action/authAction';
import { Redirect } from 'react-router-dom';
class SignUp extends Component {
    state = {
        email: '',
        password: '',
        firstName: "",
        lastName: ""
    }


    handleSubmit = (e) => {
        e.preventDefault();
        this.props.createUser(this.state);
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    render() {
        if (this.props.auth.uid) return <Redirect to="/" />
        return (
            <div className="container">
                <form onSubmit={this.handleSubmit}>
                    <div className="input-field">
                        <input type="text" id="email" onChange={this.handleChange} />
                        <label htmlFor="email">Email</label>
                    </div>
                    <div className="input-field">
                        <input type="password" id="password" onChange={this.handleChange} />
                        <label htmlFor="password">Password</label>
                    </div>
                    <div className="input-field">
                        <input type="text" id="firstName" onChange={this.handleChange} />
                        <label htmlFor="firstName">First Name</label>
                    </div>
                    <div className="input-field">
                        <input type="text" id="lastName" onChange={this.handleChange} />
                        <label htmlFor="lastName">Last Name</label>
                    </div>
                    <div className="input-field">
                        <button className="btn">Login</button>
                    </div>
                </form>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        createUser: (creds) => dispatch(createUser(creds))
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SignUp);