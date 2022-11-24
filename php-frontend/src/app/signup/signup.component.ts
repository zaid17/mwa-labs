import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { SignupService } from '../signup.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  name!: string;
  username!: string;
  password!: string;
  repeatPassword!: string;
  isRegistered: boolean = false;
  isError: boolean = false;
  message: string = '';
  constructor(private signUpService: SignupService, private route: Router) {}

  onSubmit(form: NgForm) {
    if (form.value.password !== this.repeatPassword) {
      this.isError = true;
      this.message = 'Passwords must match';
      return;
    }
    this.signUp(form.value);
  }

  signUp(json: JSON) {
    this.isError = false;
    this.isRegistered = false;
    this.signUpService.signUp(json).subscribe(
      (val) => {
        this.isRegistered = true;
        this.message = 'Success, please login to your account';
        this.goToLogin();
      },
      (error) => {
        this.isError = true;
        this.message = 'invalid username';
      }
    );
  }

  goToLogin() {
    setTimeout(() => this.route.navigate(['login']), 3000);
  }

  ngOnInit(): void {}
}
