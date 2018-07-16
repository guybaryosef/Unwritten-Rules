// basic requiered stuff
const express = require('express'),
    path = require('path'),
    bodyParser = require('body-parser'),
    cors = require('cors'),
    mongoose = require('mongoose'),
    config = require('./config/DB');

const app = express();

// connects to the database
mongoose.Promise = global.Promise;
mongoose.connect(config.DB).then(
    () => {console.log('Database is connected') },
    err => { console.log('Can not connect to the database'+ err)}
);

// load in the express routing for the database
const RuleRouter = require('./routes/Rule.route');

app.use(bodyParser.json());
app.use(cors());
const port = process.env.PORT || 4000;

//this needs to come after the cors and port listening...
app.use('/db', RuleRouter);

const server = app.listen(port, function(){
    console.log('Listening on port ' + port);
});