import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  get isAuth() {
    return this.authService.isAuth();
  }
  constructor(private authService: AuthService,) { }

  ngOnInit(): void {
  }

}
