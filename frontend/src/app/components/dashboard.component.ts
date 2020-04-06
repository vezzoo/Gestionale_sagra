import {Component, OnInit} from '@angular/core';
import {categories, getPagesOfCategory} from "../../settings/routing";
import {getPageNameFromPath} from "../utility/sharedFunctions";

@Component({
    selector: 'app-dashboard',
    templateUrl: '../models/dashboard.component.html',
    styleUrls: ['../../styles/dashboard.component.sass']
})

export class DashboardComponent implements OnInit {

    private _categories;

    constructor() {

    }

    ngOnInit(): void {
        this._categories = {};
        for (let cat of categories)
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
