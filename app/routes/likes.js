//Not used
var express = require('express');
var router = express.Router();
var Like = require('../models/likes');

// Get Homepage
router.post('/add', ensureAuthenticated, function(req, res) {
    var user_id = req.body.user_id;
    var serie_id = req.body.serie_id;

    // Validation
    if(!user_id ||!serie_id){
        res.send(JSON.stringify({"error":"missing field"}));
    } else {
        var newLike = new Like({
            user_id: user_id,
            serie_id: serie_id
        });

        Like.addLike(newLike, function(err, like){
            if(err) throw err;
            console.log(like);
        });

        return res.send(200);
    }
});

router.get('/', ensureAuthenticated, function(req, res) {
    var user_id = req.headers.user_id;
    console.log(user_id);
    // var serie_id = req.body.serie_id;
    Like.getUserLikes(user_id,function (err, likes) {
        if(err) throw err;
        console.log(likes);
        return res.send(JSON.stringify(likes));
    })

});

function ensureAuthenticated(req, res, next){
    if(req.isAuthenticated()){
        return next();
    } else {
        //req.flash('error_msg','You are not logged in');
        console.log("not logged in");
        res.status(401);
        res.redirect('/login');
    }
}

module.exports = router;