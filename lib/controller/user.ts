export default class User {

    username: string;

    password: string;

    constructor() {
        const credentialsStorage: string = window.localStorage.getItem('ff');

        if (credentialsStorage) {
            const credentials: any = JSON.parse(credentialsStorage);
            this.username = credentials.username;
            this.password = credentials.password;
        }
    }

}
