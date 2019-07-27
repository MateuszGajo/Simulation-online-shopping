import React, { Component } from "react";
import Card from "./Card";

class Products extends Component {
  render() {
    const { user } = this.props;

    return (
      <div className="container section">
        <div className="card">
          <div className="content">
            <span className="card-title">
              {" "}
              <h3 className="center">Resume</h3>
            </span>
            <Card user={user} />
          </div>
        </div>
      </div>
    );
  }
}

export default Products;
