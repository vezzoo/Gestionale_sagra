import {enableProdMode} from '@angular/core';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

import {AppModule} from './app/app.module';
import {environment} from './environments/environment';
import UdpSocket from "./network/udp/UdpSocket";
import Elaborator from "./network/http_client/Elaborator";
import Authenticator from "./network/http_client/Authenticator";
import HttpRequestTemplate from "./network/http_client/HttpRequestTemplate";

if (environment.production) {
    enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
    .catch(err => console.error(err))
