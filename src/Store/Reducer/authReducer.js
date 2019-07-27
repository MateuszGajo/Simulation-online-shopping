const initState = {
  authError: ""
};

const authReducer = (state = initState, action) => {
  switch (action.type) {
    case "CREATE_USER_SUCCESS":
      return {
        ...state,
        authError: ""
      };
    case "CREATE_USER_ERROR":
      return {
        ...state,
        authError: action.err.message
      };
    case "SIGNIN_ERROR":
      return {
        ...state,
        authError: action.err.message
      };

    case "SIGNIN_SUCCESS":
      return {
        ...state,
        authError: ""
      };
    case "SIGNOUT_SUCCESS":
      return state;
    default:
      return state;
  }
};

export default authReducer;
