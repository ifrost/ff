import View from "./view";
import {select} from "d3-selection";

export default class GamePlayer extends View {
    test: any;

    protected init() {
        super.init();
        this.test = select(this.root).append("p");
    }

    showState(state) {
        this.test.text(state.test);
    }

}