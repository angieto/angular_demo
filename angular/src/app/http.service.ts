
import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})

export class HttpService {

    constructor(private _http: HttpClient) { 
    }

    getTasksFromService() {
        return this._http.get('/tasks');
    }

    makeTask(newTask) {
        return this._http.post('/tasks', newTask);
    }

    getTask(id:String) {
        return this._http.get('/tasks/'+id);
    }

    editTask(selectedTask) {
        return this._http.put('/tasks/update/:id', selectedTask);
    }
}