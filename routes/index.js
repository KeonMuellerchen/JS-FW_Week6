var express = require('express');
var projects = require('./controllers/projects');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

//list all projects (GET)
router.get('/projects', projects.findAllProjects);
//list a specific project (GET)
router.get('/projects/:id', projects.findProjectById);

//render create form (GET)
//handle create form (POST)
router.post('/projects/new', projects.createNewProject);

//render edit form (GET)
//handle edit form (POST)
router.post('/projects/:id/edit', projects.updateProjectById);

//Delete a project (GET)
router.post('/projects/:id/delete', projects.deleteProjectById);

module.exports = router;
