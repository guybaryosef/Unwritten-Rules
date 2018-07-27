/*
 * Express routing for mongoose
 * 
 */


const express = require('express');
const app = express();
const RuleRouter = express.Router();

// we need the 'addRule' model for our database
let Rule = require('../models/Rule');

// Defined store route
RuleRouter.route('/add').post(function (req, res) {
  let rule = new Rule(req.body);
  rule.save()
    .then(game => {
    res.status(200).json({'addRule': 'rule added successfully'});
    })
    .catch(err => {
    res.status(400).send("unable to save rule to database");
    });
});

// search for a rule in databse
RuleRouter.route('/search').get(function (req, res) {
  Rule.find(function (err, details){
    if(err){
      console.log(err);
    }
    else {
      res.json(details);
    }
  });
});

// get a random rule from database
RuleRouter.route('/rand').get(function (req, res) {
  Rule.aggregate([{ $sample: {size:1} }]).exec( 
    function (err, rule) {
      if (err) {
        console.error(err); //note that this console is nodemon, not the browser's console
      }
      else {
        console.log("Recieved random rule: " + rule);
        res.json(rule[0]);
      }
    }
  );  
});

// Defined edit route
RuleRouter.route('/edit/:id').get(function (req, res) {
  let id = req.params.id;
  Rule.findById(id, function (err, rule){
      res.json(rule);
  });
});


// Defined delete | remove | destroy route
RuleRouter.route('/delete/:id').get(function (req, res) {
  Rule.findByIdAndRemove({_id: req.params.id}, function(err, details){
        if(err) res.json(err);
        else res.json('Successfully removed');
    });
});

// export these routings into the server.js file
module.exports = RuleRouter;