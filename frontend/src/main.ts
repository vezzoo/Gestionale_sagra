import {enableProdMode} from '@angular/core';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

import {AppModule} from './app/app.module';
import {environment} from './environments/environment';
import UdpSocket from "./network/udp/UdpSocket";

if (environment.production) {
  enableProdMode();
}

(async function(){
    let a = await UdpSocket.create();
    try{
        await a.bind("0.0.0.0", 8480);
        console.log("Soket binded")
    } catch (e) {
        console.log(e);
    }

    a.onRecv((na, data, oth) => {
        console.log(data, oth);
    });
})();

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
