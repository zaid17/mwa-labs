import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService, User } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  username!: string;
  password!: string;
  isAuthLogin: boolean = false;
  isError: boolean = false;
  message: string = '';

  constructor(private authService: AuthService, private route: Router) {}

  onSubmit(form: NgForm) {
    this.login(form.value);
  }

  login(json: JSON) {
    this.isError = false;
    this.isAuthLogin = false;
    this.authService.login(json).subscribe(
      (val) => {
        console.log(val);

        this.authService.user = val;
        this.isAuthLogin = true;
        this.message = 'Success';
        this.authService.token = val.token;
        this.goToHome();
      },
      (error) => {
        this.isError = true;
        this.message = 'invalid username or password';
      }
    );
  }

  goToHome() {
    setTimeout(() => this.route.navigate(['']), 3000);
  }
  goToSignUp() {
    this.route.navigate(['sign-up']);
  }

  ngOnInit(): void {}
}
