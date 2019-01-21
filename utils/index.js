import firebase from './firebase';
import 'firebase/auth';

export const fetchServerUser = (localUser, isFirstSignIn) => {
    // if the user token expires update it
    firebase.auth().onIdTokenChanged((user) => {
        if (user) {
            user.getIdToken(true).then((idToken) => {
                api.setIdToken(idToken);
            });
        }
    });

    const getCurrentUserFromServer = (resolve, reject, user) => {
        api.getCurrentUser().then((serverUser) => {
            if (!serverUser) {
                api.registerNewUser().then(() => {
                    getCurrentUserFromServer(resolve, reject, localUser);
                }).catch((error) => {
                    reject(error);
                });
            } else {
                resolve({
                    uid: user.uid,
                    ...serverUser
                });
            }
        }).catch((error) => {
            alert('an error has occured during sign in');
            reject(error);
        });
    };

    return new Promise((resolve, reject) => {
        const timeOut = setTimeout(() => {
            // some time getIdToken hangs I think its a probably with firebase auth
            // so if it takes more than 20 seconds reject
            alert('Sign in took to took long. Signing user out...');
            firebase.auth().signOut();
            reject();
        }, 20000);
        localUser.getIdToken(true).then((idToken) => {
            clearTimeout(timeOut);
            api.setIdToken(idToken);
            if (isFirstSignIn) {
                api.registerNewUser().then(() => {
                    getCurrentUserFromServer(resolve, reject, localUser);
                }).catch((error) => {
                    reject(error);
                });
            } else {
                getCurrentUserFromServer(resolve, reject, localUser);
            }
        }).catch((error) => {
            clearTimeout(timeOut);
            reject(error);
        });
    });
};
