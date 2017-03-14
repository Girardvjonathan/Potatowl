var mongoose = require('mongoose');

module.exports = mongoose.model('user', {
    id:                     {type: Number, default: Math.random()},
    name:                   {type: String, default: ''},
    password:               {type: String, default: ''},
    email:                  {type: String, default: ''},
    id_series:              {type: [Number], default: []},
    id_watched_episodes:    {type: [Number], default: []},
    created_at:             {type: Date, default: Date.now()},
    updated_at:             {type: Date, default: Date.now()}
});
