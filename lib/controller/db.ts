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

    async createGame() {

        const id: string = Math.floor(Math.random() * 100000).toString();
        const playerA: string = Math.floor(Math.random() * 100000).toString();
        const playerB: string = Math.floor(Math.random() * 100000).toString();

        return this.firestore.collection("games").add({
            id: id,
            playerA: playerA,
            playerB: playerB,
            data: {},
            state: {}
        }).then(() => {
            return {
                id: id,
                playerA: playerA,
                playerB: playerB
            }
        });
    }

    async saveGameData(gameId, data) {
        return this.firestore.collection("games").where("id", "==", gameId)
            .get()
            .then((snapshot) => {
                snapshot.forEach((game) => {
                    this.firestore.collection("games").doc(game.id).update({
                        data: data
                    })
                })
            })
    }

    async saveGameState(gameId, state) {
        return this.firestore.collection("games").where("id", "==", gameId)
            .get()
            .then((snapshot) => {
                snapshot.forEach((game) => {
                    this.firestore.collection("games").doc(game.id).update({
                        state: state
                    })
                })
            })
    }

    async joinGame(playerId, callback) {
        let playerA = await this.firestore.collection("games").where("playerA", "==", playerId).get();
        let playerB = await this.firestore.collection("games").where("playerB", "==", playerId).get();

        if(!playerA.empty || !playerB.empty) {
            let q = this.firestore.collection("games").where(!playerA.empty ? "playerA" : "playerB", "==", playerId);

            q.onSnapshot((snapshot) => {
                snapshot.docChanges().forEach(function(change) {
                    var doc = change.doc;
                    callback(doc.data().state);
                })
            });
        }

    }

    logout() {
        window.localStorage.removeItem('ff');
    }

}