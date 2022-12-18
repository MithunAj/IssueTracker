const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    author:{
        type: String,
        required: true
    },
    description:{
        type: String,
        require: true
    },
    issues:[
        {
            type: mongoose.Schema.ObjectId,
            ref: 'Issue'
        }
    ]
});


const Project = mongoose.model('Project',projectSchema);
module.exports = Project; 