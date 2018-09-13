const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/api_db', { useNewUrlParser: true }, (errs) => console.log(errs?errs:"running api db"));

const TaskSchema = new mongoose.Schema({
    title: {type: String, required: true, minlength: [3, "Title too short!"]},
    description: {type: String, default: ""},
    completed: {type: Boolean, default: false}
}, {timestamps: true});

const Task = mongoose.model('Task', TaskSchema);

module.exports = Task;