import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {RouterModule, Routes} from "@angular/router";

import {ReactiveFormsModule} from "@angular/forms";
import {AppRoutingModule} from "./app-routing.module";

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
import {MatPaginatorIntl, MatPaginatorModule} from '@angular/material/paginator';
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

import {pages} from "../settings/routing";

import {AppComponent} from './components/app.component';
import {LoginComponent} from './components/login.component';
import {DashboardComponent} from './components/dashboard.component';
import {ToolbarComponent} from './components/toolbar.component';
import {UserinterfaceComponent} from './components/userinterface.component';
import {CassaComponent} from './components/cassa.component';
import {KeyboardListenerComponent} from './components/keyboard-listener.component';
import {GestioneUtentiComponent} from './components/gestione-utenti.component';
import {getItalianPaginatorIntl} from "./italian-paginator";
import {ForbiddenComponent} from './components/forbidden.component';
import {NotFoundComponent} from './components/not-found.component';
import {MagazzinoComponent} from './components/magazzino.component';
import {StoricoComponent} from './components/storico.component';
import {StatisticheComponent} from './components/statistiche.component';

const index = 'index.html';

const redirect = pages.login.path;
const appRoutes: Routes = [
    {
        path: '',
        redirectTo: redirect,
        pathMatch: 'full'
    },
    {
        path: pages.login.path,
        component: LoginComponent
    },
    {
        path: pages.ui.path,
        component: UserinterfaceComponent,
        children: [
            {
                path: '',
                redirectTo: pages.dashboard.path,
                pathMatch: 'full'
            },
            {
                path: pages.dashboard.path,
                component: DashboardComponent
            },
            {
                path: pages.cassa.path,
                component: CassaComponent
            },
            {
                path: pages.magazzino.path,
                component: MagazzinoComponent
            },
            {
                path: pages.storico.path,
                component: StoricoComponent
            },
            {
                path: pages.statistiche.path,
                component: StatisticheComponent
            },
            {
                path: pages.gestioneUtenti.path,
                component: GestioneUtentiComponent
            },

            {
                path: pages.forbidden.path,
                component: ForbiddenComponent
            },
            {
                path: pages.notFound.path,
                component: NotFoundComponent
            }
        ]
    },

    {
        path: index,
        redirectTo: redirect,
        pathMatch: 'full'
    },
    {path: '**', component: NotFoundComponent}
];

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        DashboardComponent,
        ToolbarComponent,
        UserinterfaceComponent,
        CassaComponent,
        KeyboardListenerComponent,
        GestioneUtentiComponent,
        ForbiddenComponent,
        NotFoundComponent,
        MagazzinoComponent,
        StoricoComponent,
        StatisticheComponent
    ],
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        AppRoutingModule,
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
    providers: [
        {provide: MatPaginatorIntl, useValue: getItalianPaginatorIntl()}
    ],
    bootstrap: [AppComponent]
})

export class AppModule {

}
