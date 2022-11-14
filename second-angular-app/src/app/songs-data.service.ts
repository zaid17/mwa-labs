import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { Song } from './snogs/snogs.component';
@Injectable({
  providedIn: 'root',
})
export class SongsDataService {
  baseUrl: string = 'http://localhost:3000/api';
  constructor(private http: HttpClient) {}

  public getSongs(): Observable<string> {
    return this.http.get<string>(this.baseUrl + '/songs?count=15');
  }
  public getSong(id: string): Observable<string> {
    return this.http.get<string>(this.baseUrl + '/songs/' + id);
  }
  public addSong(data: any): Observable<any> {
    console.log('sent data', data);

    return this.http.post(
      `${this.baseUrl}/songs`,
      JSON.parse(JSON.stringify(data))
    );
  }

  public deleteSong(id: string): Observable<Object> {
    return this.http.delete(`${this.baseUrl}/songs/${id}`);
  }
}
