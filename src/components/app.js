import createProject from "./project";
import createTodo from "./todo";

function createApp() {
   let projects = [];
   let activeProject = null;

   loadProjects();

   function addProject(title){
      const newProject = createProject(title);

      projects.push(newProject);
      activeProject = newProject;
      saveProjects();
      return newProject;
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

      const todo = createTodo(title, desc, pri, date);

      project.todos.push(todo);
      saveProjects();
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
      saveProjects();
      return true; 
   }

   function deleteProjectByID(projectID){
      const index = projects.findIndex((el) => el.id === projectID);

      if (index === -1){
         return false;
      }

      if(projectID === activeProject.id){
         activeProject = null;
      }
      projects.splice(index, 1);
      saveProjects();
      return true;
   }

   function showAllTodosOfActiveProject(){
      const project = getActiveProject();
      return project ? project.todos : [];
   }

   function deleteTodo(id){
      const project = getActiveProject();
      if(!project){
         return false;
      }

      const index = project.todos.findIndex(el => el.id === id);
      if (index === -1) return false;

      project.todos.splice(index, 1);
      saveProjects();
      return true;   
   }

   function markTodoComplete(id){
      const project = getActiveProject();
      const todo = project.getAllTodos().find((el) => el.id === id)
      
      if (!todo){
         return false;
      }

      todo.completed = true;
      saveProjects();
      return true;
   }

   function saveProjects(){
      const projectsJSON = JSON.stringify(projects);
      localStorage.setItem("projects", projectsJSON);
   }

   function loadProjects() {
      const saved = localStorage.getItem("projects");
      if(!saved) return;

      projects = JSON.parse(saved);
      activeProject = projects[0] || null;
   }

   return {
      addProject,
      setActiveProject,
      getActiveProject,
      deleteActiveProject,
      deleteProjectByID,
      getAllProjects,

      addTodo,
      deleteTodo,
      markTodoComplete,
      showAllTodosOfActiveProject,
      
      saveProjects,
      loadProjects,
   };
}

export default createApp;