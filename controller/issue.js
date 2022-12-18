const Issue = require('../models/issue');
const Labels = require('../models/label');
const Project = require('../models/project');


module.exports.createIssue =  async function(req,res){
    let issue = await Issue.create(req.body);
    
    await Project.findByIdAndUpdate(req.params.id,{$push:{issues:issue}});

    return res.redirect(`/projects/details/${req.params.id}`)
}


module.exports.newIssue =async  function(req,res){
    let labels = await Labels.find({});
    return res.render('create-issue',{
        project_id : req.params.id,
        labels : labels
    });
}