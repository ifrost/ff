import View from "./view";
import {select} from "d3-selection";

export default class CreateGame extends View {


    protected init() {
        super.init();
        select(this.root).append("button").text("Nowa gra").on("click", this._newGame.bind(this));
    }

    private _newGame() {
        this.app.newGame();
    }

}