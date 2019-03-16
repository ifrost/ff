import * as firebase from 'firebase';

import Firestore = firebase.firestore.Firestore;
import LoginState from "./login-state";

export default class Db {

    private firestore: Firestore;

    constructor() {
        firebase.initializeApp({
            apiKey: "AIzaSyDwfHusMWI4-dHTTO137sHxVlvnKpqy7pw",
            authDomain: "familiada0.firebaseapp.com",
            databaseURL: "https://familiada0.firebaseio.com",
            projectId: "familiada0",
            storageBucket: "familiada0.appspot.com",
            messagingSenderId: "684649432483"
        });

    }

    setCredentials(username, password) {
        window.localStorage.setItem('ff', JSON.stringify({ username: username, password: password }));
    }

    async auth(): Promise<LoginState> {
        const credentialsStorage: string = window.localStorage.getItem('ff');

        if (!credentialsStorage) {
            return LoginState.NOT_LOGGED;
        }

        const user = JSON.parse(credentialsStorage);

        return firebase.auth().signInWithEmailAndPassword(user.username, user.password).then(() => {
            this.firestore = firebase.firestore();
            return LoginState.LOGGED;
        }).catch((error: any) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.warn(errorCode, errorMessage);
            this.logout();
            return LoginState.INCORRECT;
        });

    }

    logout() {
        window.localStorage.removeItem('ff');
    }

}