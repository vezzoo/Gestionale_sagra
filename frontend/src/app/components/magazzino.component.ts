import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {pages} from "../../settings/routing";
import LoginManager from "../../login/LoginManager";
import {User} from "../interfaces/User";

@Component({
    selector: 'app-magazzino',
    templateUrl: '../models/magazzino.component.html',
    styleUrls: ['../../styles/magazzino.component.sass']
})

export class MagazzinoComponent implements OnInit {
    @Output() _hasSidenav: EventEmitter<any> = new EventEmitter();

    private _user: User;
    private solaLettura: boolean = true;

    constructor() {

    }

    ngOnInit(): void {
        this._hasSidenav.emit(pages.magazzino.hasSideNav);

        this._user = LoginManager.getEnvLoginSync().current_user;
        this.solaLettura = this._user.permissions.includes('magazzino_read');
    }

}
