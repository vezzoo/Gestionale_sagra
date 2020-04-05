import {Component, EventEmitter, HostListener, Input, OnInit, Output} from '@angular/core';

@Component({
    selector: 'app-keyboard-listener',
    templateUrl: '../models/keyboard-listener.component.html',
    styleUrls: ['../../styles/keyboard-listener.component.sass']
})

export class KeyboardListenerComponent implements OnInit {
    @Input() private _showPath: boolean;
    @Output() private _toggleShowPath: EventEmitter<any> = new EventEmitter();

    constructor() {

    }

    ngOnInit(): void {

    }

    @HostListener('window:keypress', ['$event'])
    keyEvent(event: KeyboardEvent) {
        //toggle left side nav (e)xpand
        if (event.ctrlKey && event.key.toLowerCase() === 'e') {
            this._showPath = !this._showPath;
            this._toggleShowPath.emit(this._showPath);
        }
    }

}
