import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConstantsService } from './constants.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private constansService: ConstantsService
  ) {}

  public signUp(json: JSON): Observable<JSON> {
    return this.http.post<JSON>(this.constansService.baseURL + 'auth', json);
  }
}