import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {pages} from "../../settings/routing";

@Component({
    selector: 'app-gestione-utenti',
    templateUrl: '../models/gestione-utenti.component.html',
    styleUrls: ['../../styles/gestione-utenti.component.sass']
})

export class GestioneUtentiComponent implements OnInit {
    @Output() _hasSidenav: EventEmitter<any> = new EventEmitter();

    constructor() {

    }

    ngOnInit(): void {
        this._hasSidenav.emit(pages.gestioneUtenti.hasSideNav);
    }

}
