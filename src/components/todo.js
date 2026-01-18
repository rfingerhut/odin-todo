class Todo{
    constructor(title, description, priority, dueDate){
        this.title = title;
        this.description = description;
        this.priority = priority;
        this.dueDate = dueDate;
        this.completed = false;
        this.id = crypto.randomUUID();
    }
}

export default Todo;