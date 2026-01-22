function createUI(app) {
  const content = document.getElementById('content');

  function init(){
    render();

  }

  function render(){
    clear();
    renderProjects();
    renderTodos();
  }

  function renderProjects(){
    const projects = app.getAllProjects();

    const section = document.createElement('section');
    const ul = document.createElement('ul');

    projects.forEach(project => {
      const li = document.createElement('li');
      li.textContent = project.title;
      li.id = project.id;
      li.classList.add('project');
      li.addEventListener('click', ()=>{
        app.setActiveProject(project);
        render();
      })
      ul.appendChild(li);
    });
    section.appendChild(ul);

    const form = document.createElement('form');
    const input = document.createElement('input');
    const label = document.createElement('label');
    label.for = 'projectTitle';
    input.placeholder = "Project Name";
    input.type = 'text';
    input.name = 'projectTitle';
    const button = document.createElement('button');
    button.type = 'submit';
    button.textContent = 'submit';

    form.append(input, label, button);
    content.append(form, section);

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (!input.value){
        return;
      }

      app.addProject(input.value);
      input.value = '';
      render();
    })
  }


  function renderTodos(){
    const activeProject = app.getActiveProject();
    if(!activeProject) return;

    const todos = app.showAllTodosOfActiveProject();
    const section = document.createElement('section');
    const list = document.createElement('ul');
    todos.forEach(todo => {
      const li = document.createElement('li');
      li.textContent = todo.title;
      li.id = todo.id;
      list.appendChild(li);
    })
    section.append(list);
    content.appendChild(section);
  }


  function clear(){
    content.textContent = '';
  }

  return {
    init,
  };
}

export default createUI;
