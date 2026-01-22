import "./style.css";
import createApp from "./components/app";
import createUI from "./components/ui";

const app = createApp();
const ui = createUI(app)
ui.init();
