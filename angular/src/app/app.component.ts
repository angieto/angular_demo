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
    edittedTask: object;
    selectedTask: object;
    id: String;
    edit: boolean = false;

    constructor(private _httpService: HttpService) {}

    ngOnInit(){
        this.newTask = { title: "", description: "" };
        this.edittedTask = { title: "", description: "" };
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
        let observable = this._httpService.getTask(id);
        observable.subscribe(selectedTask => {
            console.log("This is the selected task", selectedTask);
        })
    }

    editTask(id) {
        this.edit = !this.edit;
        let observable = this._httpService.getTask(id);
        observable.subscribe(selectedTask => {
            this.edittedTask = { title: selectedTask['title'], description: selectedTask['description'] };
            console.log("Editing task...", selectedTask);
        });
    }
}
