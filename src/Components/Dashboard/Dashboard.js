/* eslint-disable jsx-a11y/img-redundant-alt */
import React from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { Redirect } from "react-router-dom";
import { firestoreConnect } from "react-redux-firebase";
import { addProduct } from "../../Store/Action/shopAction";

const Dashboard = props => {
  const { products, auth } = props;
  const rabat = {
    position: "absolute",
    top: "11%",
    right: "1%",
    padding: "5px",
    border: "2px solid red",
    borderRadius: "10px",
    textShadow: "0 0 1px black"
  };
  if (!auth.uid) return <Redirect to="/signin" />;
  return (
    <div className="container section">
      <div className="row">
        {products ? (
          products.map(product => {
            return (
              <div className="col s12 l4 " key={product.id}>
                <div className="card">
                  <div className="card-image">
                    <img src={product.image} alt="picture" height={150} />
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
                    <a href="#!" onClick={() => props.addProduct(product)}>
                      Add to Card
                    </a>
                    <span>{product.price}$</span>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <p className="center">Brak produktów</p>
        )}
      </div>
      <div className="rabat-code" style={rabat}>
        Your today's rebate code is: <b>felix</b>
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    products: state.firestore.ordered.products,
    auth: state.firebase.auth
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addProduct: product => dispatch(addProduct(product))
  };
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  firestoreConnect([
    {
      collection: "products"
    },
    {
      collection: "users"
    }
  ])
)(Dashboard);
