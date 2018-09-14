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
    // errors;

    constructor(private _httpService: HttpService) {}

    ngOnInit(){
        this.newTask = { title: "", description: "" };
        this.resetTask;
        this.getTasksFromService();
    }

    resetTask() {
        this.newTask = { title: "", description: "" };
    }

    makeTask() {
        let observable = this._httpService.makeTask(this.newTask);
        observable.subscribe(newTask => {
            console.log("Task made!", newTask); 
            // if ('errors' in newTask) this.errors = newTask; // validation errors
            this.getTasksFromService(); // update most up-to-dated list
        });
        this.resetTask(); // set input back to empty strings
    }

    getTasksFromService() {
   	    let observable = this._httpService.getTasksFromService();
   	    observable.subscribe((data: any[]) => {
            console.log("Got our tasks!", data);
            this.tasks = data;
            console.log("This is the data:", data)
        });
    }

    // display edit form
    showEdit(taskId) { 
        // this.target = taskId; so taskId could be retrieved outside of the for loop
        let observable = this._httpService.showEdit(taskId);
        observable.subscribe(targettedTask => {
            this.selectedTask = targettedTask;
            console.log("Editing task...", targettedTask);
        });
    }

    // update the editted info
    updateTask() {
        console.log("selected task: " + this.selectedTask);
        let observable = this._httpService.updateTask(this.selectedTask);
        observable.subscribe(updatedTask => {
            console.log("Task updated!", updatedTask);
            this.getTasksFromService(); // reloading the task list
        })
        this.selectedTask = undefined; // set it to a falsy statement so ngIf won't work
    }

    deleteTask() {
        let observable = this._httpService.deleteTask(this.selectedTask);
        observable.subscribe(data => {
            console.log(data);
            this.getTasksFromService();
        })
    }
}
