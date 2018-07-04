/*
 * Express routing for mongoose
 * 
 */


const express = require('express');
const app = express();
const addRuleRouter = express.Router();

// we need the 'addRule' model for our database
let AddRule = require('../models/addRule');

// Defined store route
addRuleRouter.route('/add').post(function (req, res) {
  let rule = new AddRule(req.body);
  rule.save()
    .then(game => {
    res.status(200).json({'addRule': 'rule added successfully'});
    })
    .catch(err => {
    res.status(400).send("unable to save rule to database");
    });
});

// Defined get data(index or listing) route
addRuleRouter.route('/').get(function (req, res) {
    AddRule.find(function (err, details){
    if(err){
      console.log(err);
    }
    else {
      res.json(details);
    }
  });
});

// Defined edit route
addRuleRouter.route('/edit/:id').get(function (req, res) {
  let id = req.params.id;
  AddRule.findById(id, function (err, rule){
      res.json(rule);
  });
});


// Defined delete | remove | destroy route
addRuleRouter.route('/delete/:id').get(function (req, res) {
    AddRule.findByIdAndRemove({_id: req.params.id}, function(err, details){
        if(err) res.json(err);
        else res.json('Successfully removed');
    });
});

// export these routings into the server.js file
module.exports = addRuleRouter;