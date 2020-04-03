import {Component, OnInit} from '@angular/core';
import {pages} from "../../settings/routing";

@Component({
    selector: 'app-dashboard',
    templateUrl: '../models/dashboard.component.html',
    styleUrls: ['../../styles/dashboard.component.sass']
})

export class DashboardComponent implements OnInit {

    private _hasSideNav: boolean = pages.dashboard.hasSideNav;

    constructor() {

    }

    ngOnInit(): void {

    }

    get hasSideNav(): boolean {
        return this._hasSideNav;
    }
}
