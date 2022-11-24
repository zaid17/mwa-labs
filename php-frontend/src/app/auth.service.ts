import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConstantsService } from './constants.service';

export class User {
  user_name: string = '';
  token!: string;
}
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  #token!: string | null;
  user: User = new User();
  isAuth(): boolean {
    if (this.#token) return true;

    const localStorageToken = localStorage.getItem('token');
    if (localStorageToken) return true;

    return false;
  }

  getToken() {
    return this.#token;
  }

  getHeader(): HttpHeaders {
    let header = new HttpHeaders().set(
      'Authorization',
      'Bearer ' + this.getToken()
    );
    return header;
  }

  set token(token: string) {
    this.#token = token;
    localStorage.setItem('token', token);
  }

  logout() {
    this.#token = null;
    this.user.user_name = '';
    localStorage.clear();
  }
  constructor(
    private http: HttpClient,
    private constansService: ConstantsService
  ) {}

  public login(json: JSON): Observable<User> {
    return this.http.post<User>(
      this.constansService.baseURL + this.constansService.authAPI,
      json
    );
  }
}
