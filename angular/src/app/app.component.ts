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
    showMap: Map<number, boolean>;
    newTask: object; 
    selectedTask: object;
    id: String;
    makeTaskErrors;
    updateTaskErrors;

    constructor(private _httpService: HttpService) {}

    ngOnInit() {
        this.showMap = new Map();
        this.newTask = { title: "", description: "" };
        this.resetTask();
        this.getTasksFromService();
    }

    resetTask() {
        this.newTask = { title: "", description: "" };
    }

    makeTask() {
        let observable = this._httpService.makeTask(this.newTask);
        observable.subscribe((newTask: any) => {
            if (newTask.errors) {
                this.makeTaskErrors = newTask.errors; 
                console.log("ERRORS ", this.makeTaskErrors);// validation errors
            } else {
                console.log("Task made!", newTask); 
                this.getTasksFromService(); // update most up-to-dated list
            }
        });
        this.makeTaskErrors = undefined; // reset errors back to undefined
        this.resetTask(); // set input back to empty strings
    }

    getTasksFromService() {
   	    let observable = this._httpService.getTasksFromService();
   	    observable.subscribe((tasks: any[]) => {
            this.tasks = tasks;
            console.log("This is the data:", tasks);
            this.tasks.forEach((task) => {
                this.showMap.set(task._id, false); // set every value of task._id equals to false
            });
        });
    }

    changeState(id) {
        const newVal = !this.showMap.get(id); // get the value located at the location specified by id
        this.showMap.set(id, newVal); // set the boolean to its negate state
    }

    // display edit form
    showEdit(taskId) { 
        // this.target = taskId; so taskId could be retrieved outside of the for loop
        let observable = this._httpService.showEdit(taskId);
        observable.subscribe(targettedTask => {
            this.selectedTask = targettedTask; // assign the targetted task value to this.selectedTask
            console.log("Editing task...", targettedTask);
        });
    }

    // update the editted info
    updateTask() {
        console.log("selected task: " + this.selectedTask);
        let observable = this._httpService.updateTask(this.selectedTask);
        observable.subscribe((updatedTask: any) => {
            if (updatedTask.errors) {
                this.updateTaskErrors = updatedTask.errors; 
                console.log("ERRORS ", this.updateTaskErrors); // validation errors
            } else {
                console.log("Task updated!", updatedTask);
                this.getTasksFromService(); // reloading the task list
            }
        })
        this.updateTaskErrors = undefined;
        this.selectedTask = undefined; // set it to a falsy statement so ngIf won't work
    }

    deleteTask(taskId) {
        let observable = this._httpService.deleteTask(taskId);
        console.log(this.selectedTask, "selected Task");
        observable.subscribe(deletedTask => {
            console.log("Task deleted", deletedTask);
            this.getTasksFromService();
        })
    }
}
