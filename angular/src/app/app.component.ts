import { Component, OnInit } from '@angular/core';
import { HttpService } from './http.service';
import { createTitle } from '@angular/platform-browser/src/browser/title';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
    title = 'Restful Tasks CRUD';
    tasks = [];
    newTask = {
        name: "",
        desc: ""
    };

    constructor(private _httpService: HttpService) {}

    ngOnInit(){
        this.getTasksFromService();
        
    }

    getTasksFromService() {
   	    let observable = this._httpService.getTasksFromService();
   	    observable.subscribe((data: any[]) => {
            console.log("Got our tasks!", data);
            this.tasks = data;
            console.log("This is the data:", data)
        });
    }
}
