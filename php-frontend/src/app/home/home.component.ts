import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  user_name:string='';
  get isAuth() {
    return this.authService.isAuth();
  }
  constructor(private authService: AuthService,) { }

  ngOnInit(): void {
   this.user_name= this.authService.user.user_name;
  }

}
