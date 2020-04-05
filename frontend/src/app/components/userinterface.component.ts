import {Component, OnInit} from '@angular/core';

import {Router} from "@angular/router";

import {getPagesInSideNav, getPath, pageHasSideNav} from "../../settings/routing";
import {TooltipPosition} from "@angular/material/tooltip";
import {FormControl} from "@angular/forms";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {ng_animation} from "../../settings/ng_utils";

const animazione_testo_mostra = 'show';
const animazione_testo_nascondi = 'hide';
const animazione_open = 'open';
const animazione_close = 'close';
const animation = new ng_animation(animazione_open, animazione_close);

@Component({
    selector: 'app-userinterface',
    templateUrl: '../models/userinterface.component.html',
    styleUrls: ['../../styles/userinterface.component.sass'],
    animations: [
        trigger('animateText', [
            state(animazione_testo_mostra,
                style({
                    'display': 'block',
                    opacity: 1,
                })
            ),
            state(animazione_testo_nascondi,
                style({
                    'display': 'none',
                    opacity: 0,
                })
            ),
            transition(animation.forward(), animate('150ms ease-out')),
            transition(animation.reverse(), animate('150ms ease-in')),
        ]),
        trigger('toggleSidenavState', [
            state(animazione_open,
                style({
                    'min-width': '8.3vw' //161px (1920x1080)
                })
            ),
            state(animazione_close,
                style({
                    'min-width': '3.4vw' //65px (1920x1080)
                })
            ),
            transition(animation.forward(), animate('150ms ease-out')),
            transition(animation.reverse(), animate('150ms ease-in')),
        ]),
        trigger('toggleContentState', [
            state(animazione_open,
                style({
                    'margin-left': '8.3vw' //161px (1920x1080)
                })
            ),
            state(animazione_close,
                style({
                    'margin-left': '{{marginLeft}}vw'//'3.4vw' //65px (1920x1080)
                })
                , {params: {marginLeft: 1}}),
            transition(animation.forward(), animate('150ms ease-out')),
            transition(animation.reverse(), animate('150ms ease-in')),
        ])
    ]
})

export class UserinterfaceComponent implements OnInit {
    private _state = animazione_testo_mostra;
    private positionOptions: TooltipPosition[] = ['after', 'before', 'above', 'below', 'left', 'right'];
    private _position = new FormControl(this.positionOptions[0]);

    private _pages: {
        path: string,
        isInSideNav: boolean,
        hasSideNav: boolean,
        icon: string,
        hierarchy: {
            hasParent: boolean,
            parentURL: string
        }
    }[] = getPagesInSideNav();

    private _hasSideNav: boolean = pageHasSideNav('dashboard');
    private _showPath: boolean;
    private showText: boolean;

    constructor(private router: Router) {
        this._showPath = false;
        this.showText = false;
    }

    ngOnInit(): void {

    }

    get pages(): Array<object> {
        return this._pages;
    }

    get hasSideNav(): boolean {
        return this._hasSideNav;
    }

    async pushToDashboard() {
        await this.pushTo(getPath('ui'));
    }

    async pushTo(path: string): Promise<void> {
        await this.router.navigate([getPath(path)]);
    }

    toggleShowPath(state: boolean) {
        this._showPath = state;

        if (state)
            setTimeout(() => {
                this.showText = state;
            }, 165);
        else
            this.showText = state;
    }

    getCapsName(path: string): string {
        return path.charAt(0).toUpperCase() + path.slice(1);
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
