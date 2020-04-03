import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-sidenav',
    templateUrl: '../models/sidenav.component.html',
    styleUrls: ['../../styles/sidenav.component.sass']
})

export class SidenavComponent implements OnInit {

    showFiller = false;

    constructor() {

    }

    ngOnInit(): void {

    }

}
