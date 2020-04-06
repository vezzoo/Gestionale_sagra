import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

import {Router} from "@angular/router";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {ng_animation} from "../../settings/ng_utils";
import {getPath} from "../../settings/routing";

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

    constructor(private router: Router) {

    }

    ngOnInit(): void {

    }

    get hasSidenav(): boolean {
        return this._hasSidenav;
    }

    async pushTo(where) {
        await this.router.navigate([where]);
    }

    async logout(): Promise<void> {
        await this.pushTo(getPath('login'));
    }

    toggleShowPath() {
        this._showPath = !this._showPath;
        this._toggleShowPath.emit(this._showPath);
    }

    get toggleShowPathAnimation() {
        return this._showPath ? animazione_mostra : animazione_nascondi;
    }

}
