export const addProduct = (product) => {
    return (dispatch, getState, { getFirestore }) => {
        const firestore = getFirestore();
        const state = getState();
        const auth = state.firebase.auth;
        const user = state.firestore.ordered.users.find(user => {
            return user.id === auth.uid
        });
        const oldShopping = user.shopping;
        const newShopping = [...oldShopping, product];
        let price = 0;
        const costShopping = user.shopping.map(product => {
            return price += product.price
        })
        price = price + product.price

        firestore
            .collection("users")
            .doc(auth.uid)
            .update({
                shopping: newShopping,
                allCost: price
            }).then(() => {
                dispatch({ type: "PRODUCT_ADD_SUCCESS" })
            })
    }
}

export const rabatCode = () => {
    return (dispatch, getState, { getFirestore }) => {
        const firestore = getFirestore();
        const state = getState();
        const auth = state.firebase.auth;
        const user = state.firestore.ordered.users.find(user => {
            return user.id === auth.uid
        });
        const newPrice = user.allCost - (user.allCost * 0.2);
        firestore
            .collection("users")
            .doc(auth.uid)
            .update({
                allCost: newPrice,
                activeCode: true

            }).then(() => {
                dispatch({ type: "CODE_SUCCESS" })
            })
    }
}

export const buy = () => {
    return (dispatch, getState, { getFirestore }) => {
        const firestore = getFirestore();
        const state = getState();
        const auth = state.firebase.auth;


        firestore
            .collection("users")
            .doc(auth.uid)
            .update({
                shopping: [],
                allCost: 0,
                activeCode: false
            })
    }
}

export const removeProduct = (id) => {
    return (dispatch, getState, { getFirestore }) => {
        const firestore = getFirestore();
        const state = getState();
        const auth = state.firebase.auth;
        const user = state.firestore.ordered.users.find(user => {
            return user.id === auth.uid
        });
        const oldShopping = user.shopping;
        const products = oldShopping.filter(item => {
            return item.id === id
        })
        const removeProducts = products.splice(0, products.length - 1);
        const otherShopping = oldShopping.filter(item => {
            return item.id !== id
        });
        const allShopping = [...otherShopping, ...removeProducts];
        let price = 0;
        const costShopping = allShopping.map(product => {
            return price += product.price
        })
        firestore
            .collection("users")
            .doc(auth.uid)
            .update({
                shopping: allShopping,
                allCost: price,
            })
    }
}