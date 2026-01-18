function createTodo (title, description, priority, dueDate){
    const id = Math.random().toString(16).slice(2);

    return{
        title,
        description,
        priority,
        dueDate,
        id,
    }
}

export default createTodo;