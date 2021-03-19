// build your `Project` model here
const db = require('../../data/dbConfig')

const getProjects = async () => {
    try{
        const projects = await db('projects')
        return projects.map(project => {
            project.project_completed === 0 ?
            {...project, project_completed: false} :
            {...project, project_completed: true}
        })
    } catch(err){
        return {err: 'not getting projects'}
    }
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