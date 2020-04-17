import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {User} from "../interfaces/User";
import {pages} from "../../settings/routing";
import LoginManager from "../../login/LoginManager";

@Component({
  selector: 'app-storico',
  templateUrl: '../models/storico.component.html',
  styleUrls: ['../../styles/storico.component.sass']
})

export class StoricoComponent implements OnInit {
    @Output() _hasSidenav: EventEmitter<any> = new EventEmitter();

    private _user: User;

    constructor() {

    }

    ngOnInit(): void {
        this._hasSidenav.emit({
            hasSideNav: pages.storico.hasSideNav,
            toolbarFrom: pages.storico.path
        });

        this._user = LoginManager.getEnvLoginSync().current_user;
    }

}
