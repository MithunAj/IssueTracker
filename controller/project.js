const Project = require('../models/project');
const Issue = require('../models/issue');
const Label = require('../models/label');

module.exports.newProject = function(res,res){
    // just rendering the create project ejs page
    return res.render('create-project-page');
}

module.exports.createProject = async function(req,res){
    try {
        //creating the project with request body
        await Project.create(req.body);
        // returning the user back to the home page
        return res.redirect('/home');
    } catch (error) {
        console.log(error);
        return res.redirect('back');
    }
   
}

module.exports.projectDetails = async function(req,res){
    
    try {
        // fetching the project with the project id and populating the issues property
        let project = await Project.findById(req.params.id).populate('issues');
        // getting all the issues into a variable
        let issues = project.issues;
        // fetching all the labels
        let labels = await Label.find({});
        // rendering the project-details page with all the local variables
        return res.render('project-details',{
            project : project,
            issues : issues,
            labels : labels
        })
    } catch (error) {
        console.log(error);
        return res.redirect('back');
    }

    
}