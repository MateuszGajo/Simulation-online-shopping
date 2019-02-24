const initState = {};

const authReducer = (state = initState, action) => {
    switch (action.type) {
        case "CREATE_USER_SUCCESS":
            console.log('user created')
            return state;
        case "SIGNIN_SUCCESS":
            console.log('signin success')
            return state;
        case "SIGNOUT_SUCCESS":
            console.log('signout success');
            return state;
        default:
            return state;
    }

}

export default authReducer;