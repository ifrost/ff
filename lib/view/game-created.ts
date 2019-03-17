import View from "./view";
import {select} from "d3-selection";

export default class GameCreated extends View {


    protected init() {
        super.init();

        select(this.root).append("a").attr("href", "?gameId=" + this.options.id).text("Otwórz grę");
        select(this.root).append("a").attr("href", "?playerId=" + this.options.playerA).text("Gracz 1");
        select(this.root).append("a").attr("href", "?playerId=" + this.options.playerB).text("Gracz 2");
    }
}