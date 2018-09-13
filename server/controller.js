const Task = require('./model');

// export an object that contains the logics
module.exports = {
    allTasks: (req, res) => Task.find({})
                                 .then(tasks => console.log("get all tasks:", tasks) || res.json(tasks))
                                 .catch(errs => console.log("sth's wrong:", errs) || res.json(errs)),
    getTask: (req, res) => Task.findById(req.params.id)
                                .then(task => console.log("get the task:", task) || res.json(task))
                                .catch(errs => console.log("sth's wrong:", errs) || res.json(errs)),
    createTask: (req, res) => Task.create(req.body)
                                  .then(createdtask => console.log("task created:", task) || res.json(createdtask))
                                  .catch(errs => console.log("sth's wrong:", errs) || res.json(errs)),
    updateTask: (req, res) => Task.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
                                  .then(updatedtask => console.log("task updated:", updatedtask) || res.json(updatedtask))
                                  .catch(errs => console.log("sth's wrong:", errs) || res.json(errs)),
    deleteTask: (req, res) => Task.findByIdAndRemove(req.params.id)
                                  .then(deletedtask => console.log("task deleted:", deletedtask) || res.json(deletedtask))
                                  .catch(errs => console.log("sth's wrong:", errs) || res.json(errs))
}
