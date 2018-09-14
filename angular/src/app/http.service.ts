
import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})

export class HttpService {

    constructor(private _http: HttpClient) { }

    getTasksFromService() {
        return this._http.get('/tasks');
    }

    makeTask(newTask) {
        return this._http.post('/tasks', newTask);
    }

    showEdit(taskId) {
        return this._http.get('/tasks/'+taskId);
    }

    updateTask(task) {
        return this._http.put('/tasks/update/'+task._id, task);
    }

    deleteTask(taskId) {
        return this._http.delete('/tasks/delete/'+ taskId);
    }
}