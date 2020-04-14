import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {User} from "../interfaces/User";
import {pages} from "../../settings/routing";

@Component({
    selector: 'app-forbidden',
    templateUrl: '../models/forbidden.component.html',
    styleUrls: ['../../styles/forbidden.component.sass']
})

export class ForbiddenComponent implements OnInit {
    @Output() _hasSidenav: EventEmitter<any> = new EventEmitter();

    constructor() {

    }

    ngOnInit(): void {
        this._hasSidenav.emit(pages.forbidden.hasSideNav);
    }

    setUser(user: User) {

    }

}
