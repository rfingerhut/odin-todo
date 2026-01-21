import Project from "./project";
import Todo from "./todo";

function createApp() {
   let projects = [];
   let activeProject = null;
   loadProjects();

   function addProject(title){
      const project = new Project(title);
      projects.push(project);
      activeProject = project;
      saveProjects();
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

   function saveProjects(){
      const projectsJSON = JSON.stringify(projects);
      localStorage.setItem("projects", projectsJSON);
   }

   function loadProjects() {
      const saved = localStorage.getItem("projects");
      if (!saved) return;

      const parsed = JSON.parse(saved);

      projects = parsed.map((projectData) => {
         const project = new Project(projectData.title);
         project.id = projectData.id;

         projectData.todos.forEach((todoData) => {
            const todo = new Todo(
               todoData.title,
               todoData.desc,
               todoData.pri,
               todoData.date
            );
            todo.id = todoData.id;
            todo.completed = todoData.completed;

            project.addTodoToList(todo);
         });

         return project;
      });

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