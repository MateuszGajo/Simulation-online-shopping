import React, { Component } from "react";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { connect } from "react-redux";
import {
  rabatCode,
  buy,
  addProduct,
  removeProduct
} from "../../Store/Action/shopAction";

class Card extends Component {
  state = {
    code: ""
  };
  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };
  handleSubmit = e => {
    e.preventDefault();
    if (this.state.code === "felix") {
      this.props.rabatCode();
    }
    this.setState({
      code: ""
    });
  };
  handleClick = () => {
    this.props.buy();
  };

  render() {
    const { user } = this.props;
    return (
      <div className="row">
        <div className="col s12 l4">
          {user !== undefined
            ? user.shopping.map(product => {
                return (
                  <div className="card" key={product.id}>
                    <div className="card-image">
                      <img src={product.image} alt="product" height={150} />
                    </div>
                    <div className="card-content">
                      <span className="card-title">{product.title}</span>
                      <p>
                        {product.content.length > 30
                          ? product.content.substring(0, 30) + "..."
                          : product.content}
                      </p>
                    </div>
                    <div className="card-action">
                      <span>{product.price}$</span>
                      <span className="right" style={{ display: "flex" }}>
                        ammount: {product.ammount}
                        <span>
                          <i
                            className="material-icons align-right cursor green-text"
                            onClick={() => this.props.addProduct(product)}
                          >
                            add_circle_outline
                          </i>
                          <i
                            className="material-icons cursor red-text"
                            onClick={() => this.props.removeProduct(product.id)}
                          >
                            remove_circle_outline
                          </i>
                        </span>
                      </span>
                    </div>
                  </div>
                );
              })
            : null}
        </div>
        <div className="col s12 l6 offset-l1">
          {user ? (
            user.allCost > 0 ? (
              <React.Fragment>
                <h5>
                  For shopping you mast pay:{" "}
                  {user ? user.allCost : "loading..."} $
                </h5>
                <form onSubmit={this.handleSubmit}>
                  <div className="input-field">
                    <input
                      type="text"
                      id="code"
                      onChange={this.handleChange}
                      value={this.state.code}
                    />
                    <label htmlFor="code">Rabat Code</label>
                    {user ? (
                      user.activeCode ? (
                        <button className="btn disabled">check</button>
                      ) : (
                        <button className="btn">check</button>
                      )
                    ) : null}
                  </div>
                </form>
                <div className="center section">
                  <button
                    className="btn largecenter"
                    onClick={this.handleClick}
                  >
                    Buy it
                  </button>
                </div>
              </React.Fragment>
            ) : (
              <div>
                <h5>You don't buy anything</h5>
              </div>
            )
          ) : null}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  if (
    state.firestore.ordered.users !== undefined &&
    state.firestore.ordered.products !== undefined
  ) {
    return {
      user: state.firestore.ordered.users.find(user => {
        return user.id === state.firebase.auth.uid;
      }),
      products: state.firestore.ordered.products,
      auth: state.firebase.auth
    };
  } else {
    return {};
  }
};

const mapDispatchToProps = dispatch => {
  return {
    rabatCode: () => dispatch(rabatCode()),
    buy: () => dispatch(buy()),
    addProduct: product => dispatch(addProduct(product)),
    removeProduct: id => dispatch(removeProduct(id))
  };
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  firestoreConnect([{ collection: "users" }, { collection: "products" }])
)(Card);
