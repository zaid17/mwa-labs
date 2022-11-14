import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class GamesService {
  baseUrl: string = 'http://localhost:3000/api/games/';
  constructor(private http: HttpClient) {}

  getAllGames(count:number,offset:number): Observable<Object> {
    return this.http.get(this.baseUrl+'?count='+count+'&offset='+offset);
  }

  getOneGame(id: string): Observable<Object> {
    return this.http.get(this.baseUrl + '/' + id);
  }
  search(title: string): Observable<Object> {
    return this.http.get(this.baseUrl + 'search?title=' + title);
  }
}
