import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {pages} from "../../settings/routing";
import {MatTableDataSource} from "@angular/material/table";
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";

const users: any = [
    {
        username: "Bette",
        name: "Britney Stanton",
        permessi: 'Servizi'
    },
    {
        username: "Aisha",
        name: "Myra Sharpe",
        permessi: 'Servizi, Amministrazione'
    },
    {
        username: "Fowler",
        name: "Ophelia Parrish",
        permessi: 'Servizi'
    },
    {
        username: "Gena",
        name: "Annabelle Mccarthy",
        permessi: 'Servizi'
    },
    {
        username: "Hampton",
        name: "Sonja Webster",
        permessi: 'Servizi, Gestione'
    },
    {
        username: "Beasley",
        name: "Stephenson York",
        permessi: 'Servizi'
    },
    {
        username: "Butler",
        name: "Hensley Grimes",
        permessi: 'Gestione'
    },
    {
        username: "Myrtle",
        name: "Cline Dillon",
        permessi: 'Amministrazione'
    },
    {
        username: "Summer",
        name: "Alexandria Moses",
        permessi: 'Servizi, Gestione, Amministrazione'
    },
    {
        username: "Sykes",
        name: "Corine Walton",
        permessi: 'Servizi'
    },
    {
        username: "Rosa",
        name: "Earlene Chaney",
        permessi: 'Servizi'
    },
    {
        username: "Ford",
        name: "Michael Hamilton",
        permessi: 'Servizi'
    },
    {
        username: "Barron",
        name: "Goodman Powell",
        permessi: 'Servizi'
    },
    {
        username: "Hall",
        name: "Macias Melendez",
        permessi: 'Servizi'
    }
];

@Component({
    selector: 'app-gestione-utenti',
    templateUrl: '../models/gestione-utenti.component.html',
    styleUrls: ['../../styles/gestione-utenti.component.sass']
})

export class GestioneUtentiComponent implements OnInit {
    @Output() _hasSidenav: EventEmitter<any> = new EventEmitter();

    displayedColumns: string[] = ['username', 'nome', 'permessi'];
    dataSource = new MatTableDataSource(users);

    @ViewChild(MatSort, {static: true}) sort: MatSort;
    @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

    constructor() {

    }

    ngOnInit(): void {
        this._hasSidenav.emit(pages.gestioneUtenti.hasSideNav);

        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
    }

    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

}
