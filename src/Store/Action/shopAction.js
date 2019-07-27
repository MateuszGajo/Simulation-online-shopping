export const addProduct = product => {
  return (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    const state = getState();
    const auth = state.firebase.auth;
    const user = state.firestore.ordered.users.find(user => {
      return user.id === auth.uid;
    });
    const oldShopping = user.shopping;
    const newProduct = {
      ...product,
      ammount: 1
    };
    let addNew = true;
    let newShopping;
    const productExist = oldShopping.map(item => {
      if (item.id === product.id) {
        addNew = false;
        return {
          ...item,
          ammount: item.ammount + 1
        };
      } else {
        return {
          ...item
        };
      }
    });
    addNew
      ? (newShopping = [...oldShopping, newProduct])
      : (newShopping = [...productExist]);

    let price = 0;
    newShopping.map(product => {
      return (price = price + product.price * product.ammount);
    });

    firestore
      .collection("users")
      .doc(auth.uid)
      .update({
        shopping: newShopping,
        allCost: price
      })
      .then(() => {
        dispatch({ type: "PRODUCT_ADD_SUCCESS" });
      });
  };
};

export const rabatCode = () => {
  return (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    const state = getState();
    const auth = state.firebase.auth;
    const user = state.firestore.ordered.users.find(user => {
      return user.id === auth.uid;
    });
    const newPrice = user.allCost - user.allCost * 0.2;
    firestore
      .collection("users")
      .doc(auth.uid)
      .update({
        allCost: newPrice,
        activeCode: true
      })
      .then(() => {
        dispatch({ type: "CODE_SUCCESS" });
      });
  };
};

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
      });
  };
};

export const removeProduct = id => {
  return (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    const state = getState();
    const auth = state.firebase.auth;
    const user = state.firestore.ordered.users.find(user => {
      return user.id === auth.uid;
    });
    const oldShopping = user.shopping;

    let newShopping = oldShopping.map(item => {
      if (item.id === id) {
        return {
          ...item,
          ammount: item.ammount - 1
        };
      } else {
        return {
          ...item
        };
      }
    });

    newShopping = newShopping.filter(item => {
      return item.ammount > 0;
    });

    let price = 0;
    newShopping.map(product => {
      return (price = price + product.price * product.ammount);
    });
    firestore
      .collection("users")
      .doc(auth.uid)
      .update({
        shopping: newShopping,
        allCost: price
      });
  };
};
