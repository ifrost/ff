import * as firebase from 'firebase';

import Firestore = firebase.firestore.Firestore;
import User from "./user";
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

    async auth(user: User): Promise<LoginState> {
        if (!user.username || !user.password) {
            return LoginState.NOT_LOGGED;
        }

        return firebase.auth().signInWithEmailAndPassword(user.username, user.password).then(() => {
            this.firestore = firebase.firestore();
            return LoginState.LOGGED;
        }).catch(function(error: any) {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.warn(errorCode, errorMessage);
            return LoginState.INCORRECT;
        });

    }

}