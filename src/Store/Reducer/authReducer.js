const initState = {
    authError: ""
};

const authReducer = (state = initState, action) => {
    switch (action.type) {
        case "CREATE_USER_SUCCESS":
            console.log('user created')
            return {
                ...state,
                authError: ""
            };
        case "CREATE_USER_ERROR":
            console.log('register error');
            return {
                ...state,
                authError: action.err.message
            };
        case "SIGNIN_ERROR":
            console.log('login error')
            return {
                ...state,
                authError: action.err.message
            }

        case "SIGNIN_SUCCESS":
            console.log('signin success')
            return {
                ...state,
                authError: ""
            };
        case "SIGNOUT_SUCCESS":
            console.log('signout success');
            return state;
        default:
            return state;
    }

}

export default authReducer;