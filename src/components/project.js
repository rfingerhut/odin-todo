
function createProject(title){
    return {
        todos: [],
        title,
        id: crypto.randomUUID(),
    }
}

export default createProject;