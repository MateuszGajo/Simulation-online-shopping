const initState = {};

const shopReducer = (state = initState, action) => {
  switch (action.type) {
    case "PRODUCT_ADD_SUCCESS":
      return state;
    case "CODE_SUCCESS":
      return state;
    default:
      return state;
  }
};

export default shopReducer;
