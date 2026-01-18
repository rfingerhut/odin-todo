import "./style.css";
import createApp from './components/app';

const app = createApp();

app.addProject('project #1');
const currProj = app.getActiveProject();
app.addTodo('Todo #1', currProj.id);
