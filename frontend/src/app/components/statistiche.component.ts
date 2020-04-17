import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {User} from "../interfaces/User";
import {pages} from "../../settings/routing";
import LoginManager from "../../login/LoginManager";

@Component({
    selector: 'app-statistiche',
    templateUrl: '../models/statistiche.component.html',
    styleUrls: ['../../styles/statistiche.component.sass']
})

export class StatisticheComponent implements OnInit {
    @Output() _hasSidenav: EventEmitter<any> = new EventEmitter();

    private _user: User;

    constructor() {

    }

    ngOnInit(): void {
        this._hasSidenav.emit({
            hasSideNav: pages.statistiche.hasSideNav,
            toolbarFrom: pages.statistiche.path
        });

        this._user = LoginManager.getEnvLoginSync().current_user;
    }

}
