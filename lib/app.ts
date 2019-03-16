import User from "./controller/user";
import Db from "./controller/db";
import LoginPage from "./view/loginpage";
import { select } from "d3-selection";
import LoginState from "./controller/login-state";

export default class App {
    db: Db;

    constructor() {
        this.db = new Db();
    }

    async init() {

        const user: User = new User();

        const state: LoginState = await this.db.auth(user);

        if (state !== LoginState.LOGGED) {
            if (state === LoginState.INCORRECT) {
                window.alert("Incorrect password");
            }
            new LoginPage(this, select("body"));
            window.localStorage.removeItem('ff');
        }
        else {
            console.log("logged in")
        }

    }

    async login(username, password) {
        window.localStorage.setItem('ff', JSON.stringify({ username: username, password: password }));
        select("body").selectAll("*").remove();
        this.init();
    }
}