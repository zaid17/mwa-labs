import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Song } from './songs/songs.component';
import { AuthService } from './auth.service';
import { ConstantsService } from './constants.service';
@Injectable({
  providedIn: 'root',
})
export class SongsService {
  private songsURL: string =
    this.constantsService.baseURL + this.constantsService.songsAPI;
  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private constantsService: ConstantsService
  ) {}

  public getSongs(): Observable<Object> {
    return this.http.get(this.songsURL);
  }

  public getOneSong(id: string): Observable<Song> {
    return this.http.get<Song>(this.songsURL + id);
  }

  public deleteSong(id: string): Observable<Object> {
    return this.http.delete(this.songsURL + id, {
      headers: this.authService.getHeader(),
    });
  }

  public addSong(json: JSON): Observable<Object> {
    return this.http.post(this.songsURL, json, {
      headers: this.authService.getHeader(),
    });
  }

  public editSong(id: string, json: JSON): Observable<Object> {
    return this.http.patch(this.songsURL + id, json, {
      headers: this.authService.getHeader(),
    });
  }
  public updateSong(id: string, json: JSON): Observable<Object> {
    return this.http.put(this.songsURL + id, json, {
      headers: this.authService.getHeader(),
    });
  }
}
