import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConstantsService } from './constants.service';


export class Token {
  token!: string;
}
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  #token!: string | null;

  isAuth(): boolean {
    if (this.#token) return true;

    const localStorageToken = localStorage.getItem('token');
    if (localStorageToken) return true;

    return false;
  }

  set token(token: string) {
    this.#token = token;
    localStorage.setItem('token', token);
  }

  logout() {
    this.#token=null;
    localStorage.clear();
  }
  constructor(
    private http: HttpClient,
    private constansService: ConstantsService
  ) {}

  public login(json: JSON): Observable<Token> {
    return this.http.post<Token>(this.constansService.baseURL + 'auth', json);
  }
}
