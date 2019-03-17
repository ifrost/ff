import View from "./view";
import {select} from "d3-selection";

export default class GameHost extends View {
    test: any;

    protected init() {
        super.init();
        this.test = select(this.root).append("input").on("keyup", this._update.bind(this));
    }

    private _update() {
        const value = this.test.property("value");
        this.app.updateGame(value);
    }
}