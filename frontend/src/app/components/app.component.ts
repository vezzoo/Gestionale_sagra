import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: '../models/app.component.html',
  styleUrls: ['../../styles/app.component.sass']
})
export class AppComponent {
  title = 'gestionale-sagra-frontend';

  ngOnInit(){
    history.pushState = function (a) {};
    history.replaceState = function (a) {};
  }
}
