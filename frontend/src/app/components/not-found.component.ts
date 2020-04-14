import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {pages} from "../../settings/routing";
import {User} from "../interfaces/User";

@Component({
  selector: 'app-not-found',
  templateUrl: '../models/not-found.component.html',
  styleUrls: ['../../styles/not-found.component.sass']
})
export class NotFoundComponent implements OnInit {
    @Output() _hasSidenav: EventEmitter<any> = new EventEmitter();

    constructor() {

    }

    ngOnInit(): void {
        this._hasSidenav.emit(pages.notFound.hasSideNav);
    }

    setUser(user: User) {

    }

}
