import {enableProdMode} from '@angular/core';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

import {AppModule} from './app/app.module';
import {environment} from './environments/environment';
import UdpSocket from "./network/udp/UdpSocket";

if (environment.production) {
  enableProdMode();
}

let a = UdpSocket.create();


platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
