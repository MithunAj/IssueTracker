const Project = require('../models/project');
const Issue = require('../models/issue');

module.exports.newProject = function(res,res){

    return res.render('create-project-page');

}

module.exports.createProject = async function(req,res){
    
    await Project.create(req.body);

    return res.redirect('/home');
}

module.exports.projectDetails = async function(req,res){
   
    let project = await Project.findById(req.params.id).populate('issues');
    let issues = project.issues;
    return res.render('project-details',{
        project : project,
        issues : issues
    })
}