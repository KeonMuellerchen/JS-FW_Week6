const Project = require('../../models/project');
// Project CRUD
//creating
//create a new Project
exports.createNewProject = async(req, res) => {
    const body = req.body;
    const project = await new Project(body).save();
    res.json(project);
};

//reading
//find a project by its ID
// /projects/:id
exports.findProjectById = async(req, res) => {
    const id = req.params.id;
    const project = await Project.findById(id);
    res.json(projects);
};
//find all Projects
exports.findAllProjects = async(req, res) => {
    const projects = await Project.find();
    res.json(projects);
};

//updating
//updating a project based on its ID
exports.updateProjectById = async(req, res) => {
    const body = req.body;
    const id = req.params.id;
    const project = await Project.findByIdAndUpdate(id, body, {
        new: true,
        runValidators: true,
    });
    res.json(project);
};

//deleting
//delete a project based on its ID