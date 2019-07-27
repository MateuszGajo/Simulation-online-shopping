import React from "react";
import SignedInLinks from "./SignedInLinks";
import SignedOutLinks from "./SignedOutLinks";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";

const Navbar = props => {
  return (
    <React.Fragment>
      <nav className="nav-wrapper  hide-on-med-and-down ">
        <div className="container ">
          <ul className="">
            <li>
              <NavLink to="/" className="brand-logo">
                Shop
              </NavLink>
            </li>
          </ul>
          {props.auth.uid ? <SignedInLinks /> : <SignedOutLinks />}
        </div>
      </nav>
      <nav className="nav-wrapper  hide-on-large-only">
        <div className="container">
          <ul className="left ">
            <li>
              <NavLink to="/" className="brand-logo left hide-on-med-and-down">
                Shop
              </NavLink>
              <NavLink to="/" className="brand-logo left show-on-small-only">
                Shop
              </NavLink>
            </li>
          </ul>
          {props.auth.uid ? <SignedInLinks /> : <SignedOutLinks />}
        </div>
      </nav>
    </React.Fragment>
  );
};

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth
  };
};

export default connect(mapStateToProps)(Navbar);
