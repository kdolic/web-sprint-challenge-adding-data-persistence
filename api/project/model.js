// build your `Project` model here
const db = require('../../data/dbConfig')
const helpers = require('../middleware/middlewares')

const getProjects = async () => {
    const getProject = db('projects as pr')
    .select('pr.project_name', 'pr.project_description', 'pr.project_completed')
        return getProject.then(projects=>{
        return projects.map(project=> helpers.projectToBody(project))
})
}

const getById = async (project_id) =>{
    try{
        const project = await db('projects').where({project_id}).first()
        return {
            ...project, project_completed: project.project_completed === 0 ? false : true
        }

    } catch(err){
        return {err: 'not getting project'}
    }
}

const create = async (project) =>{
    const [id] = await db('projects').insert(project, ['project_id', 'project_name', 'project_description', 'project_completed'])
        return getById(id)
}

module.exports = {
    getProjects,
    getById,
    create
}