class Project{
    constructor(title){
        this.title = title,
        this.todos = [];
        this.id = crypto.randomUUID();
    }
}

export default Project;