import {enableProdMode} from '@angular/core';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

import {AppModule} from './app/app.module';
import {environment} from './environments/environment';
import LoginManager from "./login/LoginManager";
import UserPermissionComparator from "./login/comparator/user_permissions/UserPermissionComparator";
import EventExecution from "./login/EventExecution";
import StringArrayComparatorContain from "./login/comparator/string_array/StringArrayComparatorContain";
import AndComparator from "./login/comparator/AndComparator";
import NotComparator from "./login/comparator/NotComparator";
import StringArrayComparatorAll from "./login/comparator/string_array/StringArrayComparatorAll";

if (environment.production) {
    enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
    .catch(err => console.error(err))
