
//////////////////////////////////////////
///   api endpoints for managing users //
////////////////////////////////////////

const router = require('express').Router();
let User = require('../models/user.model');

// Your Challenge: Make rwo routes. Each will use mongojs methods
// to interact with your mongoDB database, as instructed below.
// You will be using express Router and Mongoose
// -/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/


// 1. get all users on record
// GET: /
// ========================================

// telling our router including express use the get method of our home page endpoint
// using async keyword = using asynchinous processing so we are going to use a promise
// taking in request and response parameters and then we use try/ catch statement
// we try block to create a exception, we try await our User(create-user.js component) with find method
// then we respond and send back our user
// if our try isnt true it goes to our next exception catch
//in catch we want a response back giving us a 500 status code error with a message
router.get('/', async (req,res)=>{
    try{
        const user = await User.find()
        res.send(user);
    }
    catch(err) {
        res.status(500).json({message: err.message})
    }
}) 


// 2. add a new user
// POST /add
// ========================================

// telling our router including express use the post method with our add endpoint
// running in async format
// within function we want create a new object that allows the user to create a new user with username
// we set username and the req.body(input) as key value pair. whatever user types in for username will equal that
//then save our user document using the .save method with an await callback and set it to document user
// then we want a response to send our doc user (let user (var)


router.post('/add', async (req, res) => {
    let user = new User({
        username: req.body.username
    });
    user = await user.save();
    res.send(user)

})

// we export router so we can import this file into other files 
module.exports = router;