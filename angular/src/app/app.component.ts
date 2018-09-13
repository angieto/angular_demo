import { Component, OnInit, Input } from '@angular/core';
import { HttpService } from './http.service';
import { createTitle } from '@angular/platform-browser/src/browser/title';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
    tasks = [];
    newTask: object; 
    selectedTask: object;
    id: String;

    constructor(private _httpService: HttpService) {}

    ngOnInit(){
        this.newTask = {
            title: "",
            description: ""
        };
        this.getTasksFromService();
    }

    makeTask() {
        let observable = this._httpService.makeTask(this.newTask);
        observable.subscribe(newTask => {
            console.log("Task made!", newTask);
            this.newTask = {title:"", description:""};
        });
    }

    getTasksFromService() {
   	    let observable = this._httpService.getTasksFromService();
   	    observable.subscribe((data: any[]) => {
            console.log("Got our tasks!", data);
            this.tasks = data;
            console.log("This is the data:", data)
        });
    }

    getTask(id) {
        let observable = this._httpService.getTask(this.id);
        observable.subscribe(selectedTask => {
            console.log("This is the task", selectedTask);
        })
    }

    // editTask() {
    //     let observable = this._httpService.editTask(this.selectedTask);
    //     observable.subscribe(selectedTask => {
    //         console.log("Task is updated!", selectedTask);
    //     });
    }
}
