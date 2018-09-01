/*
 * Express routing for mongoose
 * 
 */


const express = require('express');
const app = express();
const RuleRouter = express.Router();

// we need the Rule model for our database
let Rule = require('../models/Rule');


/*
 * Adding a rule to the database
 */
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


/*
 * Searching for a rule in database.
 * req.params is the query words in format String[]
 */
RuleRouter.route('/search').get(function (req, res) {
  Rule.find({$text: {$search: req.query['key']}}).limit(5).exec(
    function (err, rules){
      if(err){
        console.log(err);
      }
      else {
        console.log('Found search results:', rules[0]);
        res.json(rules);
      }
    });
});


/*
 * Getting a random rule from database
 */
RuleRouter.route('/rand').get(function (req, res) {
  Rule.aggregate([{ $sample: {size:1} }]).exec( 
    function (err, rule) {
      if (err) {
        console.error(err); //note that this console is nodemon, not the browser's console
      }
      else {
        console.log("Received random rule: " + rule);
        res.json(rule[0]);
      }
    }
  );  
});


/*
 *  Editing a rule in the db (only for increasing thumbs up & down)
 */
RuleRouter.route('/edit/:id').post(function (req, res) {
  Rule.findById(req.params.id, function(err, curRule) {
    if (!curRule)
      res.json('could not load the rule :(');
    else {
      curRule.thumbsUp = req.body.thumbsUp;
      curRule.thumbsDown = req.body.thumbsDown;

      curRule.save()
        .then(curRule => {
          res.json('Edit complete');
        })
        .catch(err => {
          res.status(400).send("unable to update the database");
        });
    }
  });
  
  /* 
  ////////////////////////////////////////////////
  let updatedRule = new Rule(req.body)
  // by making  the route end with :id, req.params.id will be the __ in /edit/__
  Rule.findByIdAndUpdate(req.params.id, updatedRule, function (err, rule){
      res.json(rule);
  });
  */
});


/*
 * Currently here to delete rule from db.
 * I do not think this will be a functionality.
 */
RuleRouter.route('/delete/:id').get(function (req, res) {
  Rule.findByIdAndRemove({_id: req.params.id}, function(err, details){
        if(err) res.json(err);
        else res.json('Successfully removed');
    });
});


// export these routings into the server.js file
module.exports = RuleRouter;