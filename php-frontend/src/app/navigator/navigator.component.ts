import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-navigator',
  templateUrl: './navigator.component.html',
  styleUrls: ['./navigator.component.css'],
})
export class NavigatorComponent implements OnInit {
  url!: string;
  get isAuth() {
    return this.authService.isAuth();
  }
  constructor(private authService: AuthService) {}
  logout() {
    this.authService.logout();
  }
  ngOnInit(): void {}
}
