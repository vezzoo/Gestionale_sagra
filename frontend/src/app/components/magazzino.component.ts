import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {pages} from "../../settings/routing";
import LoginManager from "../../login/LoginManager";
import {User} from "../interfaces/User";
import {MatTableDataSource} from "@angular/material/table";
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";

const products: DialogData[] = [
    {
        name: "Pane e salamella",
        description: "Un buonissimo panino",
        price: 2.50,
        stock: 150,
        group: "Cucina",
        popup: "Ketchup-senape-maionese"
    },
    {
        name: "Formaggio fuso",
        description: "",
        price: 2.00,
        stock: 10,
        group: "Cucina",
        popup: "Nessuno"
    },
    {
        name: "Patatine",
        description: "",
        price: 2.00,
        stock: 50,
        group: "Cucina",
        popup: "Nessuno"
    }
];

interface DialogData {
    name: string,
    description: string,
    price: number,
    stock: number,
    group: string,
    popup: string
}

@Component({
    selector: 'app-magazzino',
    templateUrl: '../models/magazzino.component.html',
    styleUrls: ['../../styles/magazzino.component.sass']
})

export class MagazzinoComponent implements OnInit {
    @Output() _hasSidenav: EventEmitter<any> = new EventEmitter();

    displayedColumns: string[] = ['name', 'description', 'price', 'stock', 'group', 'popup'];
    dataSource = new MatTableDataSource(products);

    @ViewChild(MatSort, {static: true}) sort: MatSort;
    @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

    private _user: User;

    constructor() {

    }

    ngOnInit(): void {
        this._hasSidenav.emit({
            hasSideNav: pages.magazzino.hasSideNav,
            toolbarFrom: pages.magazzino.path
        });

        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;

        this._user = LoginManager.getEnvLoginSync().current_user;
    }

    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

}
