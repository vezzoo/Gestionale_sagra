import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-toolbar',
    templateUrl: '../models/toolbar.component.html',
    styleUrls: ['../../styles/toolbar.component.sass']
})

export class ToolbarComponent implements OnInit {

    private _user : {
        name: string
    };

    constructor() {
        this._user = {
            name: "Luca"
        };
    }

    ngOnInit(): void {

    }

    get user(): { name: string } {
        return this._user;
    }
}
