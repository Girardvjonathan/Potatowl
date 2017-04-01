var mongoose = require('mongoose');

// User Schema
var LikeSchema = mongoose.Schema({
    user_id: {
        type: String,
        index:true
    },
    serie_id: {
        type: String
    }
});

var Like = module.exports = mongoose.model('Like', LikeSchema);

module.exports.addLike = function(newLike, callback){
    newLike.save(callback);
}

module.exports.getLikeBySerieId = function(serie_id, callback){
    var query = {serie_id: serie_id};
    Like.findOne(query, callback);
}

module.exports.getLikeBySerieIdAndUserId = function(serie_id, user_id, callback){
    var query = {serie_id: serie_id, user_id: user_id};
    Like.findOne(query, callback);
}

module.exports.removeLike = function(newUser, callback){

}

module.exports.getUserLikes = function(id, callback){
    var query = {user_id: id};
    Like.find(query, callback).select('serie_id -_id');
}
