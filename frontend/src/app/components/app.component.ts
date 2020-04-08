import {Component} from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: '../models/app.component.html',
    styleUrls: ['../../styles/app.component.sass']
})

export class AppComponent {
    title = 'gestionale';

    ngOnInit() {
        history.pushState = function (state, title, url) {
            // console.log(state, title, url)
        };
        history.replaceState = function (state, title, url) {
            // console.log(state, title, url)
        };
    }
}
