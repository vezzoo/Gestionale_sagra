import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {pages} from "../../settings/routing";

@Component({
    selector: 'app-cassa',
    templateUrl: '../models/cassa.component.html',
    styleUrls: ['../../styles/cassa.component.sass']
})

export class CassaComponent implements OnInit {
    @Output() _hasSidenav: EventEmitter<any> = new EventEmitter();

    constructor() {

    }

    ngOnInit(): void {
        this._hasSidenav.emit(pages.cassa.hasSideNav);
    }

}
