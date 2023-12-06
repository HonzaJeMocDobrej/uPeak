const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {type: String, required: true},
    password: {type: String, required: true},
    country: {type: String, required: true},
    streaks: {type: Object, required: false, default: {}},
    todos: {type: Object, required: false, default: {}},
    notes: {type: Object, required: false, default: {}},
    pomodoro: {type: Object, required: false, default: {}},
    profilePic: {type: String, required: false}
})

module.exports = mongoose.model('User', userSchema)