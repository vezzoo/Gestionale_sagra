import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

import {Router} from "@angular/router";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {ng_animation} from "../../settings/ng_utils";

const animazione_mostra = 'mostra';
const animazione_nascondi = 'nascondi';
const animation = new ng_animation(animazione_mostra, animazione_nascondi);

@Component({
    selector: 'app-toolbar',
    templateUrl: '../models/toolbar.component.html',
    styleUrls: ['../../styles/toolbar.component.sass'],
    animations: [
        trigger('toggleShowPathAnimation', [
            state(animazione_nascondi, style({transform: 'rotate(0)'})),
            state(animazione_mostra, style({transform: 'rotate(-180deg)'})),
            transition(animation.forward(), animate('350ms ease-out')),
            transition(animation.reverse(), animate('350ms ease-in'))
        ])
    ]
})

export class ToolbarComponent implements OnInit {
    @Input() private _hasSidenav: boolean;
    @Input() private _showPath: boolean;
    @Output() private _toggleShowPath: EventEmitter<any> = new EventEmitter();

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

    get hasSidenav(): boolean {
        return this._hasSidenav;
    }

    async pushTo(where) {
        await this.router.navigate([where]);
    }

    async logout(): Promise<void> {
        // await this.pushTo(pages.login.path);
    }

    toggleShowPath() {
        this._showPath = !this._showPath;
        this._toggleShowPath.emit(this._showPath);
    }

    get toggleShowPathAnimation() {
        return this._showPath ? animazione_mostra : animazione_nascondi;
    }

}
