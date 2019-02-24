import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { signOut } from '../../Store/Action/authAction';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';

const SignedInLinks = (props) => {
    const { users, profil } = props;

    return (
        <ul className="right">
            <li>
                <NavLink to="/products">Shopping ({users ? users.allCost : 'loading...'}$)</NavLink>
            </li>
            <li>
                <a href="#!">{profil.fullName}</a>
            </li>
            <li>
                <Link to="/signin" onClick={props.signOut}>Log Out</Link>
            </li>
        </ul>
    )
}

const mapStateToProps = (state) => {
    console.log(state)
    if (state.firestore.ordered.users !== undefined) {
        return {
            users: state.firestore.ordered.users.find(user => {
                return user.id === state.firebase.auth.uid
            }),
            profil: state.firebase.profile
        }
    }
    else {
        return {
            profil: state.firebase.profile
        }
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        signOut: () => dispatch(signOut())
    }
}


export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([{
        collection: 'users'
    }])
)
    (SignedInLinks)