function createProject (title){
    const id = Math.random().toString(16).slice(2);

    return {
        title,
        todos: [],
        id,
    }
}

export default createProject;