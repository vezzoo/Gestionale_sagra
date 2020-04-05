import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {RouterModule, Routes} from "@angular/router";

import {ReactiveFormsModule} from "@angular/forms";

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatBadgeModule} from '@angular/material/badge';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
import {MatButtonModule} from '@angular/material/button';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatCardModule} from '@angular/material/card';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatChipsModule} from '@angular/material/chips';
import {MatStepperModule} from '@angular/material/stepper';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatDialogModule} from '@angular/material/dialog';
import {MatDividerModule} from '@angular/material/divider';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatListModule} from '@angular/material/list';
import {MatMenuModule} from '@angular/material/menu';
import {MatNativeDateModule, MatRippleModule} from '@angular/material/core';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatSliderModule} from '@angular/material/slider';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatSortModule} from '@angular/material/sort';
import {MatTableModule} from '@angular/material/table';
import {MatTabsModule} from '@angular/material/tabs';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatTreeModule} from '@angular/material/tree';

import {getPath} from "../settings/routing";

import {AppComponent} from './components/app.component';
import {LoginComponent} from './components/login.component';
import {DashboardComponent} from './components/dashboard.component';
import {ToolbarComponent} from './components/toolbar.component';
import {UserinterfaceComponent} from './components/userinterface.component';
import {CassaComponent} from './components/cassa.component';
import { KeyboardListenerComponent } from './components/keyboard-listener.component';

const index = 'index.html';

const redirect = getPath('ui');
const appRoutes: Routes = [
    {
        path: '',
        redirectTo: redirect,
        pathMatch: 'full'
    },
    {
        path: getPath('login'),
        component: LoginComponent
    },
    {
        path: getPath('ui'),
        component: UserinterfaceComponent,
        children: [
            {
                path: '',
                redirectTo: getPath('dashboard'),
                pathMatch: 'full'
            },
            {
                path: getPath('dashboard'),
                component: DashboardComponent
            },
            {
                path: getPath('cassa'),
                component: CassaComponent
            },
            {
                path: getPath('magazzino'),
                component: DashboardComponent
            },
            {
                path: getPath('storico'),
                component: DashboardComponent
            },
            {
                path: getPath('statistiche'),
                component: DashboardComponent
            }
        ]
    },

    {
        path: index,
        redirectTo: redirect,
        pathMatch: 'full'
    }
    // {path: '**', component: PageNotFoundComponent}
];

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        DashboardComponent,
        ToolbarComponent,
        UserinterfaceComponent,
        CassaComponent,
        KeyboardListenerComponent
    ],
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        RouterModule.forRoot(appRoutes
            // , { enableTracing: true }
        ),
        BrowserAnimationsModule,
        MatAutocompleteModule,
        MatBadgeModule,
        MatBottomSheetModule,
        MatButtonModule,
        MatButtonToggleModule,
        MatCardModule,
        MatCheckboxModule,
        MatChipsModule,
        MatStepperModule,
        MatDatepickerModule,
        MatDialogModule,
        MatDividerModule,
        MatExpansionModule,
        MatGridListModule,
        MatIconModule,
        MatInputModule,
        MatListModule,
        MatMenuModule,
        MatNativeDateModule,
        MatPaginatorModule,
        MatProgressBarModule,
        MatProgressSpinnerModule,
        MatRadioModule,
        MatRippleModule,
        MatSelectModule,
        MatSidenavModule,
        MatSliderModule,
        MatSlideToggleModule,
        MatSnackBarModule,
        MatSortModule,
        MatTableModule,
        MatTabsModule,
        MatToolbarModule,
        MatTooltipModule,
        MatTreeModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})

export class AppModule {

}
