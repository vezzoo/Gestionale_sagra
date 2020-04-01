import {Component, OnInit} from '@angular/core';

import {FormBuilder} from '@angular/forms';
import {animate, state, style, transition, trigger} from "@angular/animations";
import {ng_animation} from "../../settings/ng_utils";
import LoginManager from "../../login/LoginManager";
import {login} from "../../settings/requests";

const animazione_mostra = 'mostra';
const animazione_nascondi = 'nascondi';
const animation = new ng_animation(animazione_mostra, animazione_nascondi);
const loginManager = LoginManager.getEnvLogin();

@Component({
    selector: 'app-login',
    templateUrl: '../models/login.component.html',
    styleUrls: ['../../styles/login.component.sass'],
    animations: [
        trigger('errorLoginText', [
            state(animazione_mostra, style({
                opacity: 1
            })),
            state(animazione_nascondi, style({
                opacity: 0
            })),
            transition(animation.forward(), animate('500ms ease-out')),
            transition(animation.reverse(), animate('500ms ease-in'))
        ])
    ]
})

export class LoginComponent implements OnInit {
    private readonly _checkoutForm;

    private _hidePassword: boolean = true;
    private _loginError: boolean = false;

    private errorMessage: String = "Username o password errati";

    constructor(private formBuilder: FormBuilder,) {
        this._checkoutForm = this.formBuilder.group({
            username: '',
            password: ''
        });
    }

    checkIfIsLogged(): boolean {
        return loginManager.isLogged();
    }

    ngOnInit(): void {
        if (this.checkIfIsLogged()) {
            //push to dashboard
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

    async doLogin(credentials: { username: string, password: string }) {
        if (!this.checkIfIsLogged()) {
            // let res = await loginManager.login(credentials.username, credentials.password);
            // if (res.success) {
            //     //push to dashboard
            // } else {
            //     this.errorMessage = res.message;
            //     this._loginError = true;
            // }
        }
    }

    getErrorMessage() {
        this._checkoutForm.patchValue({
            password: ''
        });

        return this.errorMessage;
    }

    onKey(event: any) {
        if (this._loginError)
            this._loginError = false;
    }

    get errorLogin() {
        return this._loginError ? animazione_mostra : animazione_nascondi;
    }
}
