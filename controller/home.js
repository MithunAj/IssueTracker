const Project = require('../models/project');


module.exports.homePage = async function(req,res){

    let projects = await Project.find({});

    return res.render('home',{
        projects : projects
    })

}