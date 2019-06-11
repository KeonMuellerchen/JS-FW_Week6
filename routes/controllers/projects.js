const Project = require('../../models/project');
// Project CRUD
//creating
//create a new Project

//reading
//find a project by its ID
// /projects/:id
const findProjectById = async(req, res) => {
    const id = req.params.id;
    const project = await Project.findById(id);
    res.json(projects);
};
//find all Projects
const findAllProjects = async(req, res) => {
    const projects = await Project.find();
    res.json(projects);
};

//updating
//updating a project based on its ID

//deleting
//delete a project based on its ID