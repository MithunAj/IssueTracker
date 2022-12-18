const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 8000;
const db = require('./config/mongoose');
const path = require('path');

app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname,'/assets')));
app.set('view engine','ejs');
app.set('views','./views')



app.use('/',require('./routes'));




app.listen(port,function(err){
    if(err){
        console.log('there was an error listening on port :',port);
        return
    }

    console.log('The app is up and running on port : ',port);
})