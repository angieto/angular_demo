const api = require('./controller');
const bodyParser = require('body-parser');

// export a function that handles routes
module.exports = function(app) {
    app.use(bodyParser.json());
    app.get('/tasks', api.allTasks);
    app.get('/tasks/:id', api.getTask);
    app.post('/tasks', api.createTask);
    app.put('/tasks/update/:id', api.updateTask);
    app.delete('/tasks/delete/:id', api.deleteTask);
}