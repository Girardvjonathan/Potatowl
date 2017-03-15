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

module.exports.removeLike = function(newUser, callback){

}

module.exports.getUserLikes = function(id, callback){
    var query = {user_id: id};
    Like.find(query, callback).select('serie_id -_id');
}
