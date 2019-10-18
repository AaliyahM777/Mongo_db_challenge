
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


module.exports = router;