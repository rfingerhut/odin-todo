import "./style.css";
import createApp from './components/app';

function runTests() {
  const app = createApp();

  console.log("=== START TESTS ===");

  // 1. Test addProject
  const projectA = app.addProject("Project A");
  console.log("Project C created:", projectA);
  console.log("Active project:", app.getActiveProject());
    const projectC = app.addProject("Project C");


  // 5. Test addTodo (should add to Project A)
   app.addTodo("Todo 1", "desc", "high", "2026-01-01");
   app.addTodo("Todo 2", "desc", "low", "2026-01-02");
   app.addTodo("Todo 3", "desc", "low", "2026-01-02");
}

runTests();
