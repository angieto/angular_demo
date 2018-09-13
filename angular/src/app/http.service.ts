
import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})

export class HttpService {
    constructor(private _http: HttpClient) { 
        this.getTasksFromService();
        this.getOneTask();
    }
    getTasksFromService() {
        return this._http.get('/tasks');
    }
    getOneTask() {
        return this._http.get('/tasks/5b9703aab75d4d124cd10db1');
    }
}