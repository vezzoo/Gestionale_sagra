import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

import {Router} from "@angular/router";
import {TooltipPosition} from "@angular/material/tooltip";
import {FormControl} from "@angular/forms";
import {pushTo} from "../utility/sharedFunctions";
import {
    toggleShowPathAnimation,
    animazione_mostra,
    animazione_nascondi
} from "../animations/toolbar/toggleShowPathAnimation";
import {pages} from "../../settings/routing";
import LoginManager from "../../login/LoginManager";

@Component({
    selector: 'app-toolbar',
    templateUrl: '../models/toolbar.component.html',
    styleUrls: ['../../styles/toolbar.component.sass'],
    animations: [
        toggleShowPathAnimation
    ]
})

export class ToolbarComponent implements OnInit {
    @Input() private _hasSidenav: boolean;
    @Input() private _showPath: boolean;
    @Output() private _toggleShowPath: EventEmitter<any> = new EventEmitter();

    private positionOptions: TooltipPosition[] = ['after', 'before', 'above', 'below', 'left', 'right'];
    private _position = new FormControl(this.positionOptions[3]);

    constructor(private router: Router) {

    }

    ngOnInit(): void {

    }

    get hasSidenav(): boolean {
        return this._hasSidenav;
    }

    async logout(): Promise<void> {
        await (await LoginManager.getEnvLogin()).logout();
        await pushTo(this.router, pages.login.path);
    }

    toggleShowPath() {
        this._showPath = !this._showPath;
        this._toggleShowPath.emit(this._showPath);
    }

    get toggleShowPathAnimation() {
        return this._showPath ? animazione_mostra : animazione_nascondi;
    }

    get position(): FormControl {
        return this._position;
    }
}
