import Project from "./project";
import Todo from "./todo";

function createApp() {
   const projects = [];
   let activeProject = null;

   function addProject(title){
      const project = new Project(title);
      projects.push(project);
      activeProject = project;
      return project;
   }

   function getActiveProject(){
      return activeProject;
   }

   function setActiveProject(project){
      activeProject = project;
   }

   function getProjectById(id){
      const project = projects.find((el) => el.id === id);
      return project;
   }

   function addTodo(title, desc, pri, date){
      const project = getActiveProject();
      if (!project) return false;

      const todo = new Todo(title, desc, pri, date);
      project.addTodoToList(todo);
      return true;
   }

   function getAllProjects(){
      return projects;
   }

   function deleteActiveProject(){
     const index = projects.findIndex((el) => el.id === activeProject.id);

      if (index === -1){
         return false;
      }

      projects.splice(index, 1);
      activeProject = null;
      return true; 
   }

   function deleteProjectByID(projectID){
      const index = projects.findIndex((el) => el.id === projectID);

      if (index === -1){
         return false;
      }

      projects.splice(index, 1);
      return true;
   }

   function showAllTodosOfActiveProject(){
      const project = getActiveProject();
      return project.getAllTodos();
   }

   function deleteTodo(id){
      const project = getActiveProject();
      if(!project){
         return false;
      }

      return project.removeTodoByID(id);      
   }

   function markTodoComplete(id){
      const project = getActiveProject();
      const todo = project.getAllTodos().find((el) => el.id === id)
      
      if (!todo){
         return false;
      }

      todo.markComplete();
      return true;
   }


   return {
      addProject,
      getActiveProject,
      addTodo,
      getAllProjects,
      deleteActiveProject,
      deleteProjectByID,
      showAllTodosOfActiveProject,
      setActiveProject,
      deleteTodo,
      markTodoComplete,
   };
}

export default createApp;