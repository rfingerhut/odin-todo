class Project{
    constructor(title){
        this.title = title || 'untitled',
        this.todos = [];
        this.id = crypto.randomUUID();
    }

    setTitle(newTitle){
        this.title = newTitle;
    }

    addTodoToList(todo){
        this.todos.push(todo);
    }

    getAllTodos(){
        return this.todos;
    }

    removeTodoByID(id){
        const index = this.todos.findIndex((el) => el.id === id);

        if (index === -1){
            return false;
        }

        this.todos.splice(index, 1);
        return true;
    }
}

export default Project;