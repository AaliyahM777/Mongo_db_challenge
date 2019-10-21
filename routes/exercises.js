
/////////////////////////////////////////////
//// API endpoints for managing exercises //
///////////////////////////////////////////

const router = require('express').Router();
let Exercise = require('../models/exercise.model');

// Your Challenge: Make five routes. Each will use mongojs methods
// to interact with your mongoDB database, as instructed below.
// You will be using express Router and Mongoose
// -/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/


// 1. get all exercise logs on record
// GET: /
// ========================================

// telling our router including express use the get method of our home page endpoint
// using async keyword = using asynchinous processing so we are going to use a promise
// taking in request and response parameters and then we use try/ catch statement
// we try block to create a exception, we try await our Exercise(exercise-model.js component) with find method
// then we respond and send back our exercise
// if our try isnt true it goes to our next exception catch
//in catch we want a response back giving us a 500 status code error with a message
router.get('/', async (req, res) => {
    try {
        const exercise = await Exercise.find()
        res.send(exercise);
    }
    catch (err) {
        res.status(500).json({ message: err.message })
    }
})


// 2. add a new exercise log
// POST: /add
// ========================================


// telling our router including express use the post method with our add endpoint
// running in async format
// within function we want create a new object that allows the user to create a new excerise log 
// we set username,description, duration, and date and the req.body(inputs) as key value pairs. whatever user types in for each category will equal that
//then save our excercise document using the .save method with an await callback and set it to document excercise
// then we want a response to send our doc exercise (let excercise (var)
router.post('/add', async (req, res) => {
    let exercise = new Exercise({
        username: req.body.username,
        description: req.body.description,
        duration: req.body.duration,
        date: req.body.date
    });
    exercise = await exercise.save();
    res.send(exercise)

})

// 3. retrieve a specfic exercise log
// GET: /:id
// ========================================

//telling our router including express use the get method to find specific id with our find/:id  endpoint
// same as above we use try and catch
// try= find id from excercise model
//catch= if error is caught send json response with status code number 500
router.get('/find/:id', async (req, res) => {
    try {
        const exercise = await Exercise.findById(req.params.id)
        res.send(exercise)
    }
    catch (err) {
        res.status(500).json({ message: err.message })
    }
})



// 4. delete a specfic exercise log
// DELETE: /:id
// ========================================

//telling our router including express use the delete method to find specific id with our /:id  endpoint
// same as above we use try and catch
// try= find and delete id from excercise model
//catch= if error is caught send json response with status code number 500

router.delete('/:id', async (req, res) => {
    try {
        const exercise = await Exercise.findByIdAndDelete(req.params.id)
        res.send(exercise)
    }
    catch (err) {
        res.status(500).json({ message: err.message })
    }
})


// 5. retrieve a specific exercise log and update it 
// with information sent by client on req body
// POST: /update/:id
// ========================================

//telling our router including express use the postmethod to update specific id with our/update /:id  endpoint
// we use the update one method to update one specific id set to an array of objects
// _id property is setting to req params id
//and then we use $set property set to a new set of inputs including (username, duration, etc)
// then we want to get a response sent back sneding excercise which is our new updated data

router.post('/update/:id', async (req, res) => {
    let exercise = await Exercise.updateOne(
        {
            _id: req.params.id
        },


        {
            $set: {
                username: req.body.username,
                description: req.body.description,
                duration: req.body.duration,
                date: req.body.date
            }
        }
    )
    res.send(exercise)
})

// we export router so we can import this file into other files 
module.exports = router;