import { format} from "date-fns";

function createUI(app) {
  const content = document.getElementById('content');

  function init(){
    render();

  }

  function render(){
    clear();
    renderProjects();
    renderTodos(app);
  }

  function renderProjects(){
    const projects = app.getAllProjects();

    const section = document.createElement('section');
    const ul = document.createElement('ul');
    

    projects.forEach(project => {
      const button = document.createElement('button');
      button.textContent = 'X';
      button.classList.add('deleteProjectButton');
      const li = document.createElement('li');
      li.textContent = project.title;
      li.id = project.id;
      li.classList.add('project');
      li.appendChild(button);
      li.addEventListener('click', ()=>{
        app.setActiveProject(project);
        render();
      })
      ul.append(li);
    });
    section.appendChild(ul);

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

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (!input.value){
        return;
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
        card.append(title, desc, pri, date);
        li.append(card);
        list.appendChild(li);
      })
  
      form.addEventListener('submit', (e) => {
          e.preventDefault();

          const formattedDate = format(inputDate.value, 'MM/dd/yyyy');

          app.addTodo(inputTitle.value, inputDesc.value, select.value, formattedDate);
          
          inputTitle.textContent = '';
          inputDesc.textContent = '';
          inputPriority.textContent = '';
          inputDate.textContent = '';
          render();
        });
  
      section.appendChild(list);
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
