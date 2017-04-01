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
        //put good http code
        res.status(401);
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

router.post('/remove', ensureAuthenticated, function(req, res) {
    var user_id = req.body.user_id;
    var serie_id = req.body.serie_id;

    // Validation
    if(!user_id || !serie_id){
        //put good http code
        res.status(401);
        res.send(JSON.stringify({"error":"missing field"}));
    } else {
        Like.getLikeBySerieId(serie_id, function(err, like){
            if(err) throw err;
            if(like != null){
           		like.remove();
            }
        });

        return res.send(200);
    }
});

router.get('/getAll', ensureAuthenticated, function(req, res) {
    var user_id = req.headers.user_id;
    Like.getUserLikes(user_id,function (err, likes) {
        if(err) throw err;
        return res.send(JSON.stringify(likes));
    })
});

function ensureAuthenticated(req, res, next){
    if(req.isAuthenticated()){
        return next();
    } else {
        res.status(401);
        res.send(JSON.stringify({"error":"not logged in"}));
    }
}

module.exports = router;