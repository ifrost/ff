import Db from "./controller/db";
import LoginPage from "./view/login-page";
import { select } from "d3-selection";
import LoginState from "./controller/login-state";
import CreateGame from "./view/create-game";
import GameHost from "./view/game-host";
import GameCreated from "./view/game-created";
import GamePlayer from "./view/game-player";

export default class App {
    db: Db;
    gameId: any;

    constructor() {
        this.db = new Db();
    }

    async init() {

        const state: LoginState = await this.db.auth();
        const params: any = this.getUrlParams();

        if (state !== LoginState.LOGGED) {
            if (state === LoginState.INCORRECT) {
                window.alert("Nieprawidłowe hasło lub sesja wygasła. Zaloguj się ponownie.");
            }
            this.show(LoginPage);
        }
        else {
            if (params.gameId) {
                this.gameId = params.gameId;
                this.show(GameHost, { gameId: params.gameId });
            }
            else if (params.playerId) {
                let game = this.show(GamePlayer);
                this.db.joinGame(params.playerId, game.showState.bind(game));

            }
            else {
                this.show(CreateGame);
            }
        }

    }

    async login(username, password) {
        this.db.setCredentials(username, password);
        await this.init();
    }

    async newGame() {
        const gameData = await this.db.createGame();
        this.show(GameCreated, gameData);
    }

    async updateGame(value) {
        await this.db.saveGameState(this.gameId, { test: value });
    }

    private show(ViewClass, options?) {
        select("body").selectAll("*").remove();
        return new ViewClass(this, select("body"), options);
    }

    private getUrlParams = function() {
        let url_params = {};
        if (window && window.location && window.location.search) {
            // @ts-ignore
            window.location.search.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(str, key, value) {
                url_params[key] = value;
            });
        }
        return url_params;
    };

}