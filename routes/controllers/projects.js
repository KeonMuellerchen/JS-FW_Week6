const Project = require('../../models/project');
// Project CRUD
//creating
//create a new Project
exports.createNewProject = async(req, res) => {
    const body = req.body;
    const project = await new Project(body).save();
    res.redirect(`/project/${project._id}`);
};

//reading
//find a project by its ID
// /projects/:id
exports.findProjectById = viewPath => async(req, res) => {
    const id = req.params.id;
    const project = await Project.findById(id);
    res.render(viewPath, {project});
};

//old
/*exports.findProjectById = async(req, res) => {
    const id = req.params.id;
    const project = await Project.findById(id);
    res.render('projects/details', {projects});
}; */
//find all Projects
exports.findAllProjects = async(req, res) => {
    const projects = await Project.find();
    res.render('projects/list', {projects});
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
    res.redirect(`/project/${project._id}`);
};

//deleting
//delete a project based on its ID
exports.deleteProjectById = async(req, res) => {
    const id = req.params.id;
    await Project.findByIdAndDelete(id);
    res.redirect('/projects');
};