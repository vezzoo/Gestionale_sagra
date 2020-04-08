import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {getPageNameFromPath, pushTo} from "../utility/sharedFunctions";
import {Router} from "@angular/router";
import {pages, categories, getPagesOfCategory} from "../../settings/routing";

@Component({
    selector: 'app-dashboard',
    templateUrl: '../models/dashboard.component.html',
    styleUrls: ['../../styles/dashboard.component.sass']
})

export class DashboardComponent implements OnInit {
    @Output() _hasSidenav: EventEmitter<any> = new EventEmitter();
    private _categories;

    constructor(private router: Router) {
        this._categories = {};
    }

    ngOnInit(): void {
        this._hasSidenav.emit(pages.dashboard.hasSideNav);

        for (let cat of Object.keys(categories))
            this._categories[cat] = getPagesOfCategory(cat);
    }

    get categories() {
        return Object.keys(this._categories);
    }

    getCatName(cat: any): string {
        return cat.charAt(0).toUpperCase() + cat.slice(1).toLowerCase();
    }

    getPages(cat: any): string {
        return this._categories[cat];
    }

    getPageNameFromObj(page: any): string {
        return getPageNameFromPath(page.path);
    }

}
