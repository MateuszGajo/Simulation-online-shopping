import React, { Component } from 'react';
import { connect } from 'react-redux';
import { signIn } from '../../Store/Action/authAction';
import { Redirect } from 'react-router-dom';

class SignIn extends Component {
    state = {
        email: '',
        password: ''
    }


    handleSubmit = (e) => {
        e.preventDefault();
        this.props.signIn(this.state);
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
                        <button className="btn">Login</button>
                    </div>
                </form>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        signIn: (creds) => dispatch(signIn(creds))
    }
}
const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SignIn);