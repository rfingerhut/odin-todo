import "./style.css";
import createApp from './components/app';

function runTests() {
  const app = createApp();

  console.log("=== START TESTS ===");

  // 1. Test addProject
  const projectA = app.addProject("Project A");
  console.log("Project A created:", projectA);
  console.log("Active project:", app.getActiveProject());

  // 2. Test getAllProjects
  console.log("All projects:", app.getAllProjects());

  // 3. Add another project
  const projectB = app.addProject("Project B");
  console.log("Project B created:", projectB);
  console.log("All projects after adding B:", app.getAllProjects());

  // 4. Test setActiveProject
  app.setActiveProject(projectA);
  console.log("Active project should be Project A:", app.getActiveProject());

  // 5. Test addTodo (should add to Project A)
  app.addTodo("Todo 1", "desc", "high", "2026-01-01");
  app.addTodo("Todo 2", "desc", "low", "2026-01-02");

  console.log("Todos in active project:", app.showAllTodosOfActiveProject());

  // 6. Test deleteTodo
  const todoToDelete = app.showAllTodosOfActiveProject()[0].id;
  console.log("Deleting todo with id:", todoToDelete);

  const deleteResult = app.deleteTodo(todoToDelete);
  console.log("Delete result (should be true):", deleteResult);
  console.log("Todos after delete:", app.showAllTodosOfActiveProject());

  // 7. Test markTodoComplete
  const todoToComplete = app.showAllTodosOfActiveProject()[0].id;
  console.log("Marking todo complete with id:", todoToComplete);

  app.markTodoComplete(todoToComplete);
  console.log("Todos after complete:", app.showAllTodosOfActiveProject());

  // 8. Test deleteProjectByID
  const deleteProjectResult = app.deleteProjectByID(projectB.id);
  console.log("Delete project B result (true):", deleteProjectResult);
  console.log("All projects after delete:", app.getAllProjects());

  // 9. Test deleteActiveProject
  app.setActiveProject(projectA);
  console.log("Active before delete:", app.getActiveProject());

  const deleteActiveResult = app.deleteActiveProject();
  console.log("Delete active project result (true):", deleteActiveResult);
  console.log("Active after delete:", app.getActiveProject());
  console.log("All projects after deleting active:", app.getAllProjects());

  console.log("=== END TESTS ===");
}

runTests();
