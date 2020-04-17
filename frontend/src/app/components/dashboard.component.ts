import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {getPageNameFromPath, pushTo} from "../utility/sharedFunctions";
import {Router} from "@angular/router";
import {pages, categories, getPagesOfCategory} from "../../settings/routing";
import {Page} from "../interfaces/Page";
import {User} from "../interfaces/User";
import LoginManager from "../../login/LoginManager";

@Component({
    selector: 'app-dashboard',
    templateUrl: '../models/dashboard.component.html',
    styleUrls: ['../../styles/dashboard.component.sass']
})

export class DashboardComponent implements OnInit {
    @Output() private _hasSidenav: EventEmitter<any> = new EventEmitter();

    private _categories;
    private _user: User;

    constructor() {
        this._categories = {};
    }

    ngOnInit(): void {
        this._hasSidenav.emit({
            hasSideNav: pages.dashboard.hasSideNav,
            toolbarFrom: pages.dashboard.path
        });

        this._user = LoginManager.getEnvLoginSync().current_user;
        for (let cat of Object.keys(categories))
            this._categories[cat] = getPagesOfCategory(cat, this._user.permissions);
    }

    get categories() {
        return Object.keys(this._categories);
    }

    getCatName(cat: string): string {
        return cat.charAt(0).toUpperCase() + cat.slice(1).toLowerCase();
    }

    getPages(cat: string): Page[] {
        return this._categories[cat];
    }

    getPageNameFromObj(page: any): string {
        return getPageNameFromPath(page.path);
    }

    showTitle(cat: string): boolean {
        return this.getPages(cat).length > 0;
    }

}
