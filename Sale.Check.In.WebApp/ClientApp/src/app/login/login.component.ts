import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  // form
  logInForm: FormGroup;
  invalidLogin: boolean;

  constructor(private _router: Router,
    private _formBuilder: FormBuilder,
    private _http: HttpClient) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.logInForm = this._formBuilder.group({
      username: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required)
    });
  }


  onValidateUser() {
    var credentials = {
      'username': this.logInForm.controls['username'].value,
      'password': this.logInForm.controls['password'].value
    };

    this._http.post('api/auth/login', credentials)
      .subscribe((res) => {
        const token = (<any>res).token;
        const userId = (<any>res).userId;
        localStorage.setItem('jwt', token);
        localStorage.setItem('userId',userId);
        this.invalidLogin = false;
        this._router.navigate(['/CheckIn']);
      }, err => {
        this.invalidLogin = true;
      });
  }

}
