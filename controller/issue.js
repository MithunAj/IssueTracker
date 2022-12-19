const Issue = require('../models/issue');
const Labels = require('../models/label');
const Project = require('../models/project');


module.exports.createIssue =  async function(req,res){
    try {
        // creating the issue with the request body
        let issue = await Issue.create(req.body);
        //inserting the project id to the created issue
        issue.project = req.params.id;
        // saving the issue document
        issue.save();
        //finding and inserting the issue into issues array within the project
        await Project.findByIdAndUpdate(req.params.id,{$push:{issues:issue}});

        return res.redirect(`/projects/details/${req.params.id}`)
    } catch (error) {
        console.log(error);
        return res.redirect('back');
    }
    
}


module.exports.newIssue =async  function(req,res){
    try {
        // fetching the all the labels
        let labels = await Labels.find({});
        // rendering the create-issue ejs page with labels and project id as local variables
        return res.render('create-issue',{
            project_id : req.params.id,
            labels : labels
        });
    } catch (error) {
        console.log(error);
        return res.redirect('back');
    }
   
}

module.exports.filterIssues = async function(req,res){
    try {
        // getting the project model for the current project for which the issue is being filtered
    let project = await Project.findById(req.params.id);
    // getting all the labels availabel in the DB
    let labels = await Labels.find({});
    // getting all the issues associated with the project
    let allIssues = await Issue.find({project:req.params.id});
    // creating a filteredIssue array to store the filtred issues as per the filter
    let filteredIssues = [];
    // maintaining a seen object to store the already inserted issues, so that we dont show duplicates
    let seen = {};
    // this varibale is to check if the input filter request was empty
    let emptyInput = true;

    if(req.body.title){
        // if the title parameter that the user is searching is not empty, setting this varibale to false
        emptyInput = false;
        // finding all the issues which match the title, here we are using REGEX (regular expression) to search case insensitively
        // and also filtering with the project id to show the issues for the current project
        let issues = await Issue.find({title:new RegExp(`^${req.body.title}$`, 'i'),project:req.params.id});
        // for all the issues found, adding them to filteredIssues array of issues
        for(issue of issues){
            await issue.populate('labels');
            // checking if the issue with the same id is already inserted
            if(!(issue.id in seen)){
                filteredIssues.push(issue);
                seen[issue.id] = true;
            }
        } 
    }

    // the functionality of this condition is same as title above
    if(req.body.description){
        emptyInput = false;
        let issues = await Issue.find({description:new RegExp(`^${req.body.description}$`, 'i'),project:req.params.id});
            for(issue of issues){
                await issue.populate('labels');
                if(!(issue.id in seen)){
                    filteredIssues.push(issue);
                    seen[issue.id] = true;
                }
            }
    }
    // the functionality of this condition is same as title above
    if(req.body.author){
        emptyInput = false;
        let issues = await Issue.find({author:new RegExp(`^${req.body.author}$`, 'i'),project:req.params.id});
            for(issue of issues){
                await issue.populate('labels');
                if(!(issue.id in seen)){
                    filteredIssues.push(issue);
                    seen[issue.id] = true;
                }
            }
    }

    // when filtering with labels, we might get the variable of type String(when only label is selected) or array when multiple labels are selected
    if(req.body.labels){
        emptyInput = false;

        // checking if the user is trying to filter with multiple labels
        if(typeof(req.body.labels) != 'string'){
            // getting the issue for each lable, if any
            for(let label of req.body.labels){
                let temp = await Issue.find({labels:label,project:req.params.id});
                for(issue of temp){
                    if(issue && !(issue.id in seen)){
                        filteredIssues.push(issue);
                        seen[issue.id] = true;
                    }
                }
            }
        }
        // if the user is trying to filter with only one label
        else{
            // getting the issues with the filtered lable
            let temp = await Issue.find({labels:req.body.labels,project:req.params.id});
                for(issue of temp){
                    if(issue && !(issue.id in seen)){
                        filteredIssues.push(issue);
                        seen[issue.id] = true;
                    }
                }
        }
    }

    // in case the filters where empty, redirecting the user back
    if(emptyInput){
        return res.redirect('back');
    }else{
    // in case the user tried applying some filters, rendering the project details page with filtered issues    
        return res.render('project-details',{
            project: project,
            issues : filteredIssues,
            labels : labels
        })
    }
    } catch (error) {
        console.log(error);
        return res.redirect('back');
    }
    


}