const router = require('express').Router();

// GET all scores
router.get('/scores',(req, res)=>{

});

// GET one score
router.get('/scores/:id',(req, res)=>{

    // req.params.id will have the score id in it

});

router.post('/scores',(req, res)=>{

    // create a score. req.body will have the data from the form you posted in the browser

});

router.delete('/scores/:id',(req, res)=>{


});

module.exports = router;