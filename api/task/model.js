// build your `Task` model here
const db = require('../../data/dbConfig')

const getTasks = () => {
    return db('tasks as t')
    .select('t.task_id', 't.task_description', 't.task_notes', 't.task_completed', 'p.project_name', 'p.project_description')
    .join('projects as p', 't.project_id', 'p.project_id')
}

const getById = async (task_id) =>{
    try{
        const task = await db('projects').where({task_id}).first()
        return {
            ...task, task_completed: task.task_completed === 0 ? false : true
        }

    } catch(err){
        return {err: 'not getting task'}
    }
}

const create = async (task) =>{
    const [id] = await db('tasks').insert(task, ['task_id', 'task_description', 'task_notes', 'task_completed', 'project_id'])
        return getById(id)
}

module.exports = {
    getTasks,
    getById,
    create
}
