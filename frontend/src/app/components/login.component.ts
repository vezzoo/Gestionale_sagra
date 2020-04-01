import {Component, OnInit} from '@angular/core';

import {FormBuilder} from '@angular/forms';
import {animate, state, style, transition, trigger} from "@angular/animations";

@Component({
    selector: 'app-login',
    templateUrl: '../models/login.component.html',
    styleUrls: ['../../styles/login.component.sass'],
    animations: [
        trigger('errorLoginText', [
            state('mostra', style({
                opacity: 1
            })),
            state('nascondi', style({
                opacity: 0
            })),
            transition('mostra => nascondi', animate('800ms ease-out')),
            transition('nascondi => mostra', animate('1000ms ease-in'))
        ])
    ]
})

export class LoginComponent implements OnInit {
    checkoutForm;

    hidePassword: boolean = true;
    loginError: boolean = false;

    errorMessage: String = "Username o password errati";

    constructor(private formBuilder: FormBuilder,) {
        this.checkoutForm = this.formBuilder.group({
            username: '',
            password: ''
        });
    }

    ngOnInit(): void {

    }

    onSubmit(data) {
        console.log(data);
        this.loginError = true;
    }

    getErrorMessage() {
        this.checkoutForm.patchValue({
            password: ''
        });

        return this.errorMessage;
    }

    onKey(event: any) {
        if (this.loginError)
            this.loginError = false;
    }

    get errorLogin() {
        return this.loginError ? 'mostra' : 'nascondi';
    }
}
