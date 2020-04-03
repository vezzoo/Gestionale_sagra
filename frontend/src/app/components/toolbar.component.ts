import {Component, Input, OnInit} from '@angular/core';

import {Router} from "@angular/router";

import {pages} from "../../settings/routing";

@Component({
    selector: 'app-toolbar',
    templateUrl: '../models/toolbar.component.html',
    styleUrls: ['../../styles/toolbar.component.sass']
})

export class ToolbarComponent implements OnInit {
    @Input() private readonly _hasSideNav: boolean;

    private _showSideNav: boolean = false;

    private readonly _user: {
        name: string
    };

    constructor(private router: Router) {
        this._user = {
            name: "Luca"
        };
    }

    ngOnInit(): void {

    }

    get user(): { name: string } {
        return this._user;
    }

    async pushToDashboard() {
        await this.pushTo(pages.dashboard.path);
    }

    async pushTo(where) {
        await this.router.navigate([where]);
    }

    async logout(): Promise<void> {
        await this.pushTo(pages.login.path);
    }

    get showSideNav(): boolean {
        return this._showSideNav;
    }

    set showSideNav(value: boolean) {
        this._showSideNav = value;
    }

    get hasSideNav(): boolean {
        return this._hasSideNav;
    }

}
