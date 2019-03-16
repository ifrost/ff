import Db from "./controller/db";
import LoginPage from "./view/login-page";
import { select } from "d3-selection";
import LoginState from "./controller/login-state";
import CreateGame from "./view/create-game";

export default class App {
    db: Db;

    constructor() {
        this.db = new Db();
    }

    async init() {

        const state: LoginState = await this.db.auth();

        if (state !== LoginState.LOGGED) {
            if (state === LoginState.INCORRECT) {
                window.alert("Nieprawidłowe hasło lub sesja wygasła. Zaloguj się ponownie.");
            }
            this.show(LoginPage);
        }
        else {
            this.show(CreateGame);
        }

    }

    async login(username, password) {
        this.db.setCredentials(username, password);
        await this.init();
    }

    newGame() {
        console.log('new game')
    }

    private show(ViewClass) {
        select("body").selectAll("*").remove();
        new ViewClass(this, select("body"));
    }

}