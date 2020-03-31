import {Component, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';

@Component({
    selector: 'app-login',
    templateUrl: '../models/login.component.html',
    styleUrls: ['../../styles/login.component.sass']
})

export class LoginComponent implements OnInit {
    checkoutForm;
    hide=true;

    constructor(private formBuilder: FormBuilder,) {
        this.checkoutForm = this.formBuilder.group({
            user: '',
            password: ''
        });
    }

    ngOnInit(): void {

    }

    onSubmit(data) {
        console.log(data);
    }

}
