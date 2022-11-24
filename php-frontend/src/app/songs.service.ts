import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Song } from './songs/songs.component';
@Injectable({
  providedIn: 'root',
})
export class SongsService {
  private static baseURL = 'http://localhost:3000/api/';
  constructor(private http: HttpClient) {}

  public getSongs(): Observable<Object> {
    return this.http.get(SongsService.baseURL + 'songs?');
  }

  public getOneSong(id: string): Observable<Song> {
    return this.http.get<Song>(SongsService.baseURL + 'songs/' + id);
  }

  public deleteSong(id: string): Observable<Object> {
    return this.http.delete(SongsService.baseURL + 'songs/' + id);
  }

  public addSong(json: JSON): Observable<Object> {
    return this.http.post(SongsService.baseURL + 'songs', json);
  }

  public editSong(id: string, json: JSON): Observable<Object> {
    return this.http.patch(SongsService.baseURL + 'songs/' + id, json);
  }
  public updateSong(id: string, json: JSON): Observable<Object> {
    return this.http.put(SongsService.baseURL + 'songs/' + id, json);
  }
}
