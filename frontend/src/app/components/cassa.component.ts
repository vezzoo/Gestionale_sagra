import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {pages} from "../../settings/routing";
import {User} from "../interfaces/User";
import LoginManager from "../../login/LoginManager";

@Component({
    selector: 'app-cassa',
    templateUrl: '../models/cassa.component.html',
    styleUrls: ['../../styles/cassa.component.sass']
})

export class CassaComponent implements OnInit {
    @Output() _hasSidenav: EventEmitter<any> = new EventEmitter();

    private _user: User;

    constructor() {

    }

    ngOnInit(): void {
        this._hasSidenav.emit(pages.cassa.hasSideNav);

        LoginManager.getEnvLogin().then(r => console.log(r.current_user.permissions));
    }

    setUser(user: User) {
        this._user = user;
    }

}
