import {ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild} from '@angular/core';

import {Router} from "@angular/router";

import {TooltipPosition} from "@angular/material/tooltip";
import {FormControl} from "@angular/forms";
import {getPageNameFromPath, pushTo} from "../utility/sharedFunctions";
import {getPagesInSideNav, pages} from "../../settings/routing";
import {animateText, animazione_testo_mostra, animazione_testo_nascondi} from "../animations/ui/animateText";
import {toggleContentState, animazione_open, animazione_close} from "../animations/ui/toggleContentState";
import {toggleSidenavState} from "../animations/ui/toggleSidenavState";
import {Page} from "../interfaces/Page";
import {User} from "../interfaces/User";
import permissions from "../../settings/pages_description/permissions";
import LoginManager from "../../login/LoginManager";


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

    private _pages: Page[];

    private _hasSideNav: boolean;
    private _showPath: boolean;
    private showText: boolean;
    private minMarginLeft: number;
    private maxMarginLeft: number;
    private _user: User;
    private toolbarFrom: string;

    @ViewChild('leftSidenav')
    private leftSidenav: ElementRef;

    constructor(private router: Router, private cdRef: ChangeDetectorRef) {
        this._hasSideNav = true;
        this._showPath = false;
        this.showText = false;
    }

    ngOnInit(): void {
        let authManager = LoginManager.getEnvLoginSync();
        this._user = authManager.current_user;

        this._pages = getPagesInSideNav(this._user.permissions);
    }

    ngAfterViewInit() {
        this.minMarginLeft = this.leftSidenav.nativeElement.offsetWidth * 0.34;
        this.maxMarginLeft = this.leftSidenav.nativeElement.offsetWidth;
        this.cdRef.detectChanges();
    }

    get pages(): Array<object> {
        return this._pages;
    }

    get hasSideNav(): boolean {
        return this._hasSideNav;
    }

    get user(): User {
        return this._user;
    }

    onActivate(componentReference: any): void {
        componentReference._hasSidenav.subscribe((data) => {
            this._hasSideNav = data.hasSideNav;
            this.toolbarFrom = data.toolbarFrom;
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

    calculateMinMarginLeft() {
        if (this._hasSideNav && this.minMarginLeft)
            return this.minMarginLeft;

        return 0;
    }

    calculateMaxMarginLeft() {
        if (this.maxMarginLeft)
            return this.maxMarginLeft;

        return 0;
    }

    getFrom(){
        return pages.ui.path;
    }

    getToolbarFrom() {
        return this.toolbarFrom;
    }
}
