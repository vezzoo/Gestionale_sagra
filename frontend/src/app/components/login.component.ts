import {Component, OnInit,} from '@angular/core';

import {Router} from "@angular/router";

import {FormBuilder} from '@angular/forms';

import LoginManager from "../../login/LoginManager";
import {pushTo} from "../utility/sharedFunctions";
import {errorLoginText, animazione_mostra, animazione_nascondi} from "../animations/login/errorLoginText";
import {pages} from "../../settings/routing";

@Component({
    selector: 'app-login',
    templateUrl: '../models/login.component.html',
    styleUrls: ['../../styles/login.component.sass'],
    animations: [
        errorLoginText
    ]
})

export class LoginComponent implements OnInit {
    private readonly _checkoutForm;

    private _hidePassword: boolean = true;
    private _loginError: boolean = false;

    private errorMessage: string = "Username o password errati";

    constructor(private formBuilder: FormBuilder, private router: Router) {
        this._checkoutForm = this.formBuilder.group({
            username: '',
            password: ''
        });
    }

    async pushToDashboard() {
        await pushTo(this.router, pages.ui.path);
    }

    async checkIfIsLogged(): Promise<boolean> {
        let loginManager = await LoginManager.getEnvLogin();
        return (await loginManager.isLogged()) && (await loginManager.is_valid());
    }

    async ngOnInit(): Promise<void> {
        if (await this.checkIfIsLogged()) {
            await this.pushToDashboard();
        }
    }

    get loginError() {
        return this._loginError;
    }

    get hidePassword(): boolean {
        return this._hidePassword;
    }

    set hidePassword(value: boolean) {
        this._hidePassword = value;
    }

    get checkoutForm() {
        return this._checkoutForm;
    }

    async doLogin(credentials: { username: string, password: string }): Promise<void> {
        let login_manager = await LoginManager.getEnvLogin();
        let result = await login_manager.login(credentials.username, credentials.password);
        if(!result.success){
            //error!
            this._loginError = true;
            this.errorMessage = result.message;
            this.resetPassword();
        } else {
            this.pushToDashboard();
        }
    }

    resetPassword(): void {
        this._hidePassword = true;
        this._checkoutForm.patchValue({
            password: ''
        });
    }

    getErrorMessage(): string {
        if (this._loginError)
            return this.errorMessage;
        else
            return "";
    }

    onKey(event: any) {
        if (this._loginError)
            this._loginError = false;
    }

    get errorLogin() {
        return this._loginError ? animazione_mostra : animazione_nascondi;
    }
}
