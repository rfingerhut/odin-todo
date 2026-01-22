
//     constructor(title, description, priority, dueDate){
//         this.title = title;
//         this.description = description;
//         this.priority = priority;
//         this.dueDate = dueDate;
//         this.completed = false;
//         this.id = crypto.randomUUID();
//     }

//     setTitle(newTitle){
//         this.title = newTitle;
//     }

//     setDescription(newDescription){
//         this.description = newDescription;
//     }

//     setPriority(newPriority){
//         this.priority = newPriority;
//     }

//     setDueDate(newDate){
//         this.dueDate = newDate;
//     }

//     markComplete(){
//         this.completed = true;
//     }
// }

// export default Todo;
function createTodo(title, desc, pri, date){
    return{
        title,
        desc,
        pri,
        date,
        id: crypto.randomUUID(),
        completed: false,
    }
}

export default createTodo;