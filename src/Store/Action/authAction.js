export const createUser = (credentials) => {
    return (dispatch, getState, { getFirestore, getFirebase }) => {
        const firebase = getFirebase();
        const firestore = getFirestore();
        firebase.auth().createUserWithEmailAndPassword(
            credentials.email,
            credentials.password
        ).then((resp) => {
            firestore.collection('users').doc(resp.user.uid).set({
                firstName: credentials.firstName,
                lastName: credentials.lastName,
                fullName: credentials.firstName + " " + credentials.lastName,
                activeCode: true,
                shopping: []
            })
        }).then(() => {
            dispatch({ type: "CREATE_USER_SUCCESS" })
        }).catch((err) => {
            dispatch({ type: "CREATE_USER_ERROR", err })
        })
    }
}

export const signIn = (credentials) => {
    return (dispatch, getState, { getFirebase }) => {
        const firebase = getFirebase();
        firebase.auth().signInWithEmailAndPassword(
            credentials.email,
            credentials.password
        ).then(() => {
            dispatch({ type: "SIGNIN_SUCCESS" })
        }).catch(err => {
            dispatch({ type: "SIGNIN_ERROR", err })
        })
    }
}

export const signOut = () => {
    return (dispatch, getState, { getFirebase }) => {
        const firebase = getFirebase();

        firebase
            .auth()
            .signOut()
            .then(() => {
                dispatch({ type: "SIGNOUT_SUCCESS" })
            })
    }
}