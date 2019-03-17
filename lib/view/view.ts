import App from "../app";
import {select} from "d3-selection";

export default class View {

    protected app: App;

    protected root: any;

    protected options: any;

    constructor(app: App, root: any, options?: any) {
        this.app = app;
        this.root = root.node();
        this.options = options || {};
        this.init();
        this.render();
    }

    protected init() {
    }

    protected render() {

    }

    destroy() {

    }
}