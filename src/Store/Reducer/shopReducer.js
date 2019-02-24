const initState = {

};

const shopReducer = (state = initState, action) => {
    switch (action.type) {
        case "PRODUCT_ADD_SUCCESS":
            console.log('product add')
            return state;
        case "CODE_SUCCESS":
            console.log('code success');
            return state;
        default:
            return state;
    }

}

export default shopReducer;