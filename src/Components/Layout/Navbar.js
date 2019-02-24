import React from 'react';
import SignedInLinks from './SignedInLinks';
import SignedOutLinks from './SignedOutLinks';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const Navbar = (props) => {
    return (
        <nav className="nav-wrapper">
            <div className="container">
                <div className="brand-logo">
                    <Link to="/">Ofert</Link>
                </div>
                {props.auth.uid ? <SignedInLinks /> : <SignedOutLinks />}
            </div>
        </nav>
    )
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth
    }
}

export default connect(
    mapStateToProps
)(Navbar);