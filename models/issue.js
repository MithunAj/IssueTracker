const mongoose = require('mongoose');

const issueSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    author:{
        type: String,
        required: true
    },
    labels:[
        {
            type:String,
        }
    ],
    project:{
        type: mongoose.Schema.ObjectId
    }
});

const Issue = mongoose.model('Issue',issueSchema);

module.exports = Issue;