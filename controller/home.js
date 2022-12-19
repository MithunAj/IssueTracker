const Project = require('../models/project');


module.exports.homePage = async function(req,res){

    try {
        // fetching all the projects from the Project model
        let projects = await Project.find({});
        //sending projects as local variable to ejs
        return res.render('home',{
            projects : projects
        })
    } catch (error) {
        console.log(error);
        return res.redirect('back');
    }


}