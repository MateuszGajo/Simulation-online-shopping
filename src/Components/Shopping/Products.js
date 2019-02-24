import React, { Component } from 'react';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { rabatCode, buy, addProduct, removeProduct } from '../../Store/Action/shopAction';

class Products extends Component {
    state = {
        code: ''
    }

    handleSubmit = (e) => {
        e.preventDefault();
        if (this.state.code === "code") {
            this.props.rabatCode()
        }
        this.setState({
            code: ""
        })
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    handleClick = () => {
        this.props.buy()
    }


    render() {
        const { user, products, } = this.props;
        console.log(user)
        const ammountProducts = []
        if (products !== undefined) {
            for (let i = 0; i < products.length; i++) {
                const amount = user.shopping.filter(item => {
                    return (item.id == i)
                })
                ammountProducts.push(amount.length);
            }
        }



        return (
            <div className="container section">
                <div className="card">
                    <div className="content">
                        <span className="card-title"> <h3 className="center">Resume</h3></span>
                        <div className="row">
                            <div className="col s12 l4">
                                {ammountProducts.map((ammount, index) => {
                                    if (ammount > 0) {
                                        const product = products.find(product => {
                                            return product.id === index;
                                        })
                                        return (
                                            <div className="card" key={index}>
                                                <div className="card-image">
                                                    <img src={product.image} alt="picture" height={150} />
                                                </div>
                                                <div className="card-content">
                                                    <span className="card-title">{product.title}</span>
                                                    <p>{product.content.length > 30 ? product.content.substring(0, 30) + "..." : product.content}</p>
                                                </div>
                                                <div className="card-action">
                                                    <span>{product.price}$</span>
                                                    <span className="right" style={{ display: "flex" }}>ammount: {ammount}
                                                        <span >
                                                            <i className="material-icons align-right cursor green-text" onClick={() => this.props.addProduct(product)}>add_circle_outline</i>
                                                            <i className="material-icons cursor red-text" onClick={() => this.props.removeProduct(product.id)}>remove_circle_outline</i>
                                                        </span>
                                                    </span>
                                                </div>
                                            </div>
                                        )
                                    }
                                }
                                )}
                            </div>
                            <div className="col s12 l6 offset-l1">

                                {
                                    user ?
                                        user.allCost > 0 ?
                                            <React.Fragment>
                                                <h5>For shopping you mast pay: {user ? user.allCost : "loading..."} $</h5>
                                                <form onSubmit={this.handleSubmit}>
                                                    <div className="input-field">
                                                        <input type="text" id="code" onChange={this.handleChange} value={this.state.code} />
                                                        <label htmlFor="code">Rabat Code</label>
                                                        {user ? user.activeCode ? <button className="btn disabled">check</button> : <button className="btn">check</button> : null}
                                                    </div>
                                                </form>
                                                <div className="center section">
                                                    <button className="btn largecenter" onClick={this.handleClick}>Buy it</button>
                                                </div>
                                            </React.Fragment>
                                            : <div ><h5>You don't buy anything</h5></div>
                                        : null
                                }


                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    if (state.firestore.ordered.users !== undefined && state.firestore.ordered.products !== undefined) {
        return {
            user: state.firestore.ordered.users.find(user => {

                return user.id === state.firebase.auth.uid
            }),
            products: state.firestore.ordered.products,
            auth: state.firebase.auth
        }
    }
    else {
        return {

        }
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        rabatCode: () => dispatch(rabatCode()),
        buy: () => dispatch(buy()),
        addProduct: (product) => dispatch(addProduct(product)),
        removeProduct: (id) => dispatch(removeProduct(id))
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([
        { collection: "users" },
        { collection: "products" }
    ])
)(Products);