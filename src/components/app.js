import createProject from "./project";
import createTodo from "./todo";

function createApp() {
   const projects = [];
   let activeProject = null;

   function addProject(title){
      const project = createProject(title);
      projects.push(project);
      activeProject = project;
   }

   function getActiveProject(){
      return activeProject;
   }

   function getProjectById(id){
      // find project with matching id
      const project = projects.find((el) => el.id === id);
      return project;
   }

   function addTodo(title, projectID){
      const todo = createTodo(title, 'desc', 'pri', 'date');
      // select matching project and then push this todo onto the list of todos.
      const project = getProjectById(projectID);
      project.todos.push(todo);
   }

   return {
      addProject,
      getActiveProject,
      addTodo,
   };
}

export default createApp;