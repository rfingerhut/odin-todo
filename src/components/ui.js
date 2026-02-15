import { format, isBefore } from "date-fns";

function createUI(app) {
  const content = document.getElementById('content');

  function init(){
    render();

  }

  function render(){
    clear();
    renderProjects();
    renderTodos(app);
    renderTodoEdit();
  }

  function renderProjects(){
    const projects = app.getAllProjects();

    const section = document.createElement('section');
    const ul = document.createElement('ul');
    const form = document.createElement('form');
    const input = document.createElement('input');
    const label = document.createElement('label');
    label.for = 'projectTitle';
    input.placeholder = "Project Name";
    input.type = 'text';
    input.name = 'projectTitle';
    input.required = true;
    const button = document.createElement('button');
    button.type = 'submit';
    button.textContent = 'submit';

    form.append(input, label, button);
    content.append(form, section);

    projects.forEach(project => {
      const button = document.createElement('button');
      button.textContent = 'X';
      button.classList.add('deleteProjectButton');

      const li = document.createElement('li');
      li.id = project.id;
      li.classList.add('project');

      const projectTitle = document.createElement('span');
      projectTitle.textContent = project.title;

      projectTitle.addEventListener('click', (el) => {
        el.stopPropagation();

        const input = document.createElement('input');
        input.type = 'text';
        input.value = project.title;

        li.replaceChild(input, projectTitle);
        input.focus();

        input.addEventListener('blur', () => {
          if(input.value.trim() !== ''){
            app.updateProjectTitle(project.id, input.value);
          }
          render();
        })

        input.addEventListener('keydown', (e) => {
          if (e.key === 'Enter'){
            input.blur();
          }
        })
      });

      li.appendChild(projectTitle, button);

      li.addEventListener('click', ()=>{
        app.setActiveProject(project);
        render();
      })

      ul.append(li);
    });
    section.appendChild(ul);

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (!input.value){
        alert('Please enter a project name.');
      }

      app.addProject(input.value);
      input.value = '';
      render();
    })

    const deleteProjButton = document.querySelectorAll('.deleteProjectButton');
    deleteProjButton.forEach(button => {
      button.addEventListener('click', () => {
        const parent = button.parentElement;
        app.deleteProjectByID(parent.id);
        render();
      })
    })

  }

  function renderTodos(app){
    const activeProject = app.getActiveProject();
    if(!activeProject) return;

    const todos = app.showAllTodosOfActiveProject();
    const section = document.createElement('section');

    const form = document.createElement('form');

    const inputTitle = document.createElement('input');
    inputTitle.placeholder = "Todo";
    inputTitle.type = 'text';
    inputTitle.name = 'todoTitle';
    inputTitle.required = true;

    const inputDesc = document.createElement('textarea');
    inputDesc.placeholder = "Description";
    inputDesc.name = 'todoDesc';

    const select = document.createElement('select');
    select.name = 'todoPri';
    select.required = true;
    const inputPriority = document.createElement('optgroup');
    inputPriority.label = 'Priority Level';

    const priLow = document.createElement('option');
    const priMed = document.createElement('option');
    const priHigh = document.createElement('option');

    priLow.textContent = 'Low';
    priLow.value=1;
    priMed.textContent = 'Medium';
    priMed.value = 2;
    priHigh.textContent = 'High';
    priHigh.value = 3;
    
    
    inputPriority.append(priLow, priMed, priHigh);
    select.append(inputPriority);
    

    const inputDate = document.createElement('input');
    inputDate.type = 'date';
    inputDate.name = 'todoDate';
    inputDate.required = true;

    const labelTitle = document.createElement('label');
    labelTitle.for = 'todoTitle';
    const labelDesc = document.createElement('label');
    labelDesc.for = 'todoDesc';
    const labelPri = document.createElement('label');
    labelPri.for = 'todoPri';
    const labelDate = document.createElement('label');
    labelDate.for = 'todoDate';

    const button = document.createElement('button');
    button.type = 'submit';
    button.textContent = 'submit';
    form.append(inputTitle, labelTitle, inputDesc, labelDesc, select, inputDate, labelDate, button);
    section.appendChild(form);

    const list = document.createElement('ul');
    todos.forEach(todo => {
      const button = document.createElement('button');
      button.textContent = '';
      button.classList.add('completeTodoButton');
      const li = document.createElement('li');
      const card = document.createElement('div');
      const title = document.createElement('p');
      const desc = document.createElement('p');
      const pri = document.createElement('p');
      const date = document.createElement('p');
      title.textContent = todo.title;
      desc.textContent = todo.desc;
      pri.textContent = todo.pri;
      date.textContent = todo.date;
      card.id = todo.id;
      card.append(title, desc, pri, date, button);
      li.append(card);
      list.appendChild(li);

      card.addEventListener('click', () => {
        app.setActiveTodo(todo.id);
        renderTodoEdit();
      })
    })

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const today = new Date();
        const [year, month, day] = inputDate.value.split('-');
        const input = new Date(year, month - 1, day);

        if(isBefore(input, today)){
          alert('Date must be in the future!');
          return;
        }

        const formattedDate = format(input, 'MM/dd/yyyy');

        app.addTodo(inputTitle.value, inputDesc.value, select.value, formattedDate);
        
        inputTitle.textContent = '';
        inputDesc.textContent = '';
        inputPriority.textContent = '';
        inputDate.textContent = '';
        render();
      });

    section.appendChild(list);
    content.appendChild(section);

    document.querySelectorAll('.completeTodoButton').forEach(button => button.addEventListener('click', () => {
      app.deleteTodo(button.parentElement.id);
      render();
    }
    ));
  }

  function renderTodoEdit(){
    const activeProject = app.getActiveProject();
    if(!activeProject) return;
    const activeTodo = app.getActiveTodo();
    console.log(JSON.stringify(activeTodo));
    
    const container = document.createElement('div');
    const todoTitle = document.createElement('h1');
    const todoDescription = document.createElement('p');
    const priorityLevelContainer = document.createElement('div');
    const todoPriorityLevel = document.createElement('p');
    priorityLevelContainer.appendChild(todoPriorityLevel);
    const todoDueDate = document.createElement('p');
    container.append(todoTitle, todoDescription, priorityLevelContainer, todoDueDate);
  }

  function clear(){
    content.textContent = '';
  }

  return {
    init,
  };
}

export default createUI;
