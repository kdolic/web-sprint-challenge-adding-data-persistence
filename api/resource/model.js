// build your `Resource` model here
const db = require('../../data/dbConfig')

const getResources = () => {
    return db('resources')
}

const getById = (resource_id) =>{
    return db('resources').where({resource_id}).first()
}

const create = async (resource) =>{
    const [id] = await db('resources').insert(resource, ['resource_id', 'resource_name', 'resource_description'])
        return getById(id)
}

module.exports = {
    getResources,
    getById,
    create
}
