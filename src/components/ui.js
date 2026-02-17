import { format, isBefore, isToday } from "date-fns";

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

      li.append(projectTitle, button);

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
      button.addEventListener('click', (e) => {
        e.stopPropagation();
        const parent = button.parentElement;
        app.deleteProjectByID(parent.id);
        render();
      })
    })

  }

  function renderTodos(){
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

    const select = renderTodoPriorityLevelSelector();
    
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
      button.addEventListener('click', () => {
        app.deleteTodo(button.parentElement.id);
        render();
        }
      )
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

        console.log(`input ${input} and today ${today}`);

        if(isBefore(input, today) && !isToday(input)){
          alert('Date must be in the future!');
          return;
        }

        const formattedDate = format(input, 'MM/dd/yyyy');

        app.addTodo(inputTitle.value, inputDesc.value, select.value, formattedDate);
        
        inputTitle.value = '';
        inputDesc.value = '';
        inputDate.value = '';
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
    if(!activeTodo) return;

    const overlay = document.createElement('div');
    overlay.classList.add("overlay");

    const sidebar = document.createElement('div');
    sidebar.classList.add('sidebar');

    const todoTitle = document.createElement('h1');
    todoTitle.textContent = activeTodo.title;

    const todoDescriptionContainer = document.createElement('div');
    const descLabel = document.createElement('h3');
    descLabel.textContent = 'Description:';
    const todoDescription = document.createElement('p');
    todoDescription.textContent = activeTodo.desc;
    todoDescriptionContainer.append(descLabel, todoDescription);

    const todoPriorityLevelContainer = document.createElement('div');
    const priLabel = document.createElement('h3');
    priLabel.textContent = 'Priority Level';
    const todoPriorityLevel = document.createElement('p');
    todoPriorityLevel.textContent = activeTodo.pri;
    todoPriorityLevelContainer.append(priLabel, todoPriorityLevel);

    const todoDueDateContainer = document.createElement('div');
    const dueDateLabel = document.createElement('h3');
    dueDateLabel.textContent = 'Due Date:';
    const todoDueDate = document.createElement('p');
    todoDueDate.textContent = activeTodo.date;
    todoDueDateContainer.append(dueDateLabel, todoDueDate);

    sidebar.append(todoTitle, todoDescriptionContainer, todoPriorityLevelContainer, todoDueDateContainer);
    overlay.appendChild(sidebar);
    content.appendChild(overlay);

    sidebar.addEventListener('click', (e) => {
      e.stopPropagation();
    })

    overlay.addEventListener('click', () => {
      overlay.remove();
    })

    todoTitle.addEventListener('click', () => {
      const titleInput = document.createElement('input');
      titleInput.type = 'text';
      titleInput.value = activeTodo.title;
      sidebar.replaceChild(titleInput, todoTitle);
      titleInput.focus();

      titleInput.addEventListener('blur', () => {
        if(titleInput.value.trim() !== ''){
            app.updateTodoTitle(activeTodo.id, titleInput.value);
            todoTitle.textContent = activeTodo.title;

            updateTodoCard(activeTodo.id);
          }
        sidebar.replaceChild(todoTitle, titleInput);
      })

      titleInput.addEventListener('keydown', (e) => {
        if(e.key === 'Enter'){
          titleInput.blur();
        }
      })
    })

    todoDescription.addEventListener('click', () => {
      const descInput = document.createElement('input');
      descInput.type = 'text';
      descInput.value = activeTodo.desc;
      todoDescriptionContainer.replaceChild(descInput, todoDescription);
      descInput.focus();

      descInput.addEventListener('blur', () => {
        if(descInput.value.trim() !== ''){
            app.updateTodoDesc(activeTodo.id, descInput.value);
            todoDescription.textContent = activeTodo.desc;
          }
        todoDescriptionContainer.replaceChild(todoDescription, descInput);
        updateTodoCard(activeTodo.id);
      })

      descInput.addEventListener('keydown', (e) => {
        if(e.key === 'Enter'){
          descInput.blur();
        }
      })
    })

    todoPriorityLevel.addEventListener('click', () => {
      const select = renderTodoPriorityLevelSelector();
      todoPriorityLevelContainer.replaceChild(select, todoPriorityLevel);
      select.focus();

      select.addEventListener('blur', () => {
        app.updateTodoPriLevel(activeTodo.id, select.value);
        todoPriorityLevel.textContent = activeTodo.pri;
        todoPriorityLevelContainer.replaceChild(todoPriorityLevel, select);
        updateTodoCard(activeTodo.id);
      })

      select.addEventListener('keydown', (e) => {
        if(e.key === 'Enter'){
          select.blur();
        }
      })
    })

    todoDueDate.addEventListener('click', () => {
      const inputDate = document.createElement('input');
      inputDate.type = 'date';

      todoDueDateContainer.replaceChild(inputDate, todoDueDate);
      inputDate.focus();

      inputDate.addEventListener('blur', () => {
        const today = new Date();
        const [year, month, day] = inputDate.value.split('-');
        const input = new Date(year, month - 1, day);

        if(isBefore(input, today)){
          alert('Date must be in the future!');
          return;
        }

        const formattedDate = format(input, 'MM/dd/yyyy');
        app.updateTodoDueDate(activeTodo.id, formattedDate);
        todoDueDate.textContent = activeTodo.date;
        todoDueDateContainer.replaceChild(todoDueDate, inputDate);
        updateTodoCard(activeTodo.id);
      })
    })
  }

  function renderTodoPriorityLevelSelector(){
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
      return select;
  }

  function updateTodoCard(id){
    const card = document.getElementById(id);
    if (!card) return;
    
    const updatedTodo = app.getActiveTodo();

    const [titleEl, descEl, priEl, dateEl] = card.children;
    titleEl.textContent = updatedTodo.title;
    descEl.textContent = updatedTodo.desc;
    priEl.textContent = updatedTodo.pri;
    dateEl.textContent = updatedTodo.date;
  }

  function clear(){
    content.textContent = '';
  }

  return {
    init,
  };
}
// CHANGE PRIORITY LEVEL FROM DISPLAYING NUMBER TO WORD.
export default createUI;