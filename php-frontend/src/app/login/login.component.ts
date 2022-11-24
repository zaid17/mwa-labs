import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { SignupService } from '../signup.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  username!: string;
  password!: string;
  isAuth: boolean = false;
  isError: boolean = false;
  message: string = '';
  constructor(private signUpService: SignupService, private route: Router) {}

  onSubmit(form: NgForm) {
    this.login(form.value);
  }

  login(json: JSON) {
    this.isError = false;
    this.isAuth = false;
    this.signUpService.signUp(json).subscribe(
      (val) => {
        this.isAuth = true;
        this.message = 'Success';
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

  ngOnInit(): void {}
}
