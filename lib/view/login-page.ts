import View from "./view";
import {select} from "d3-selection";

export default class LoginPage extends View {

    private password: any;

    private login: any;

    protected init() {
        super.init();

        this.login = select(this.root).append("input");
        this.password = select(this.root).append("input");

        const submit = select(this.root).append("button").text("login");

        submit.on("click", this._onClick.bind(this));

    }

    private _onClick() {
        this.app.login(this.login.property("value"), this.password.property("value"));
    }
}