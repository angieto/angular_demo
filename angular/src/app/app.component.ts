import { Component, OnInit } from '@angular/core';
import { HttpService } from './http.service';
import { makeStateKey } from '@angular/platform-browser';
import { mapToExpression } from '@angular/compiler/src/render3/view/util';
import { createTitle } from '@angular/platform-browser/src/browser/title';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
    title = 'restful-api';
    showMap: Map<number, boolean>;
    tasks = [];

    constructor(private _httpService: HttpService) {}

    ngOnInit(){
        this.showMap = new Map();
        // this.getTasksFromService();
    }

    getTasksFromService() {
   	    let observable = this._httpService.getTasksFromService();
   	    observable.subscribe((data: any[]) => {
            console.log("Got our tasks!", data);
            this.tasks = data;
            this.tasks.forEach((task) => {
                this.showMap.set(task._id, false); // set every value of task._id equals to false
            });
       });
    }

    changeState(id) {
        const newVal = !this.showMap.get(id); // get the value located at the location specified by id
        this.showMap.set(id, newVal); // set the boolean to its negate state
    }

}

// val = arr.get(3) <==> val = arr[3]

// arr[3] = val <==> arr.set(3, val)

// map = Map.new<int, boolean>
// for task in tasks
//     map.set(task._id, false);
