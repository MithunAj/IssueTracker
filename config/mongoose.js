const mongoose = require('mongoose');

// making a connection to mongo db 
mongoose.connect('mongodb+srv://MithunAj:TqZQxDDMNLfQgTiG@cluster0.per79te.mongodb.net/IssueTracker?retryWrites=true&w=majority');

//getting the mongo db connection to a varible
const db = mongoose.connection;

// adding a event listner for error event when making the connection to DB
db.on('error',function(error){
    console.log('There was an error opening the connection to db',error)
    return;
})

// adding a event listener to opene event when the connection is successfully established
db.once('open',function(){
    console.log('Successfully connected to MongoDB')
    return;
})


// exporting the db from this module
module.exports = db;
