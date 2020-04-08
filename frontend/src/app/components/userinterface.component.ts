import {ChangeDetectorRef, Component, OnInit} from '@angular/core';

import {Router} from "@angular/router";

import {TooltipPosition} from "@angular/material/tooltip";
import {FormControl} from "@angular/forms";
import {getPageNameFromPath, pushTo} from "../utility/sharedFunctions";
import {getPagesInSideNav, pages} from "../../settings/routing";
import {animateText, animazione_testo_mostra, animazione_testo_nascondi} from "../animations/ui/animateText";
import {toggleContentState, animazione_open, animazione_close} from "../animations/ui/toggleContentState";
import {toggleSidenavState} from "../animations/ui/toggleSidenavState";


@Component({
    selector: 'app-userinterface',
    templateUrl: '../models/userinterface.component.html',
    styleUrls: ['../../styles/userinterface.component.sass'],
    animations: [
        animateText,
        toggleContentState,
        toggleSidenavState
    ]
})

export class UserinterfaceComponent implements OnInit {
    private _state = animazione_testo_mostra;
    private positionOptions: TooltipPosition[] = ['after', 'before', 'above', 'below', 'left', 'right'];
    private _position = new FormControl(this.positionOptions[0]);

    private _pages: [];

    private _hasSideNav: boolean;
    private _showPath: boolean;
    private showText: boolean;

    private readonly _user: {
        name: string
    };

    constructor(private router: Router, private cdRef: ChangeDetectorRef) {
        this._showPath = false;
        this.showText = false;

        this._user = {
            name: "Pierangelo"
        };
    }

    ngOnInit(): void {
        this._pages = getPagesInSideNav();
        this._hasSideNav = true;
    }

    get pages(): Array<object> {
        return this._pages;
    }

    get hasSideNav(): boolean {
        return this._hasSideNav;
    }

    onActivate(componentReference: any): void {
        componentReference._hasSidenav.subscribe((data) => {
            this._hasSideNav = data;
            this.cdRef.detectChanges();
        })
    }

    getUserName(): string {
        if (!this.showText)
            return this._user.name.charAt(0).toUpperCase();

        return this._user.name;
    }

    getDashboardPath() {
        return pages.dashboard.path;
    }

    toggleShowPath(state: boolean) {
        if (this._hasSideNav) {
            this._showPath = state;

            if (state)
                setTimeout(() => {
                    this.showText = state;
                }, 165);
            else
                this.showText = state;
        }
    }

    getPageName(path: string): string {
        return getPageNameFromPath(path);
    }

    get position(): FormControl {
        return this._position;
    }

    get state(): string {
        return this._state;
    }

    get showPath(): boolean {
        return this._showPath;
    }

    animateText() {
        return this.showText ? animazione_testo_mostra : animazione_testo_nascondi;
    }

    toggleSidenavState() {
        return this._showPath ? animazione_open : animazione_close;
    }

    calculateMarginLeft() {
        if (this._hasSideNav)
            return 3.4;

        return 0;
    }
}
