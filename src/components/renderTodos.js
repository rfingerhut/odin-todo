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

    const inputDesc = document.createElement('textarea');
    inputDesc.placeholder = "Description";
    inputDesc.name = 'todoDesc';

    const select = document.createElement('select');
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

    inputPriority.name = 'todoPri';
    inputPriority.append(priLow, priMed, priHigh);
    select.append(inputPriority);

    const inputDate = document.createElement('input');
    inputDate.type = 'date';
    inputDate.name = 'todoDate';

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
      const li = document.createElement('li');
      li.textContent = todo.title;
      li.id = todo.id;
      list.appendChild(li);
    })

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        app.addTodo(inputTitle.value, inputDesc.value, inputPriority.value, inputDate.value);
        inputTitle.textContent = '';
        inputDesc.textContent = '';
        inputPriority.textContent = '';
        inputDate.textContent = '';
        render();
      });

    section.appendChild(list);
    content.appendChild(section);
  }

  export default renderTodos;