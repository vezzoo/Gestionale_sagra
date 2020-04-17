import {Component, EventEmitter, HostListener, Input, OnInit, Output} from '@angular/core';
import {pages} from "../../settings/routing";

@Component({
    selector: 'app-keyboard-listener',
    templateUrl: '../models/keyboard-listener.component.html',
    styleUrls: ['../../styles/keyboard-listener.component.sass']
})

export class KeyboardListenerComponent implements OnInit {
    @Input() private from: string;
    @Input() private _showPath: boolean;
    @Input() private _hidePassword: boolean;

    @Output() private _toggleShowPath: EventEmitter<any> = new EventEmitter();
    @Output() private _toggleShowPassword: EventEmitter<any> = new EventEmitter();

    constructor() {

    }

    ngOnInit(): void {

    }

    @HostListener('window:keypress', ['$event'])
    keyEvent(event: KeyboardEvent) {
        //toggle left side nav (e)xpand
        if (event.ctrlKey && event.code === 'KeyE' && this.from === pages.ui.path) {
            this._showPath = !this._showPath;
            this._toggleShowPath.emit(this._showPath);
        }
        //toggle (s)how password in login
        if (event.ctrlKey && event.code === 'KeyM' && this.from === pages.login.path){
            this._hidePassword = !this._hidePassword;
            this._toggleShowPassword.emit(this._hidePassword);
        }

    }

}
