import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { ConstantsService } from './constants.service';
import { SongsService } from './songs.service';
import { Artisit } from './songs/songs.component';

@Injectable({
  providedIn: 'root',
})
export class ArtistsService {
  private songsURL: string =
    this.constantsService.baseURL + this.constantsService.songsAPI;
  constructor(
    private http: HttpClient,
    private constantsService: ConstantsService,
    private authService: AuthService
  ) {}

  public addArtist(json: JSON, songId: string): Observable<Object> {
    return this.http.post(
      this.songsURL + songId + '/' + this.constantsService.artistsAPI,
      json,
      {
        headers: this.authService.getHeader(),
      }
    );
  }

  public getOneArtist(songId: string, artistId: string): Observable<Artisit> {
    return this.http.get<Artisit>(
      this.songsURL + songId + '/' + this.constantsService.artistsAPI + artistId
    );
  }

  public deleteArtist(songId: string, artistId: string): Observable<Object> {
    return this.http.delete(
      this.songsURL +
        songId +
        '/' +
        this.constantsService.artistsAPI +
        artistId,
      {
        headers: this.authService.getHeader(),
      }
    );
  }

  public editArtist(
    songId: string,
    artistId: string,
    json: JSON
  ): Observable<Object> {
    return this.http.patch(
      this.songsURL + songId + '/' + this.constantsService.artistsAPI + artistId,
      json,
      {
        headers: this.authService.getHeader(),
      }
    );
  }
  public updateArtist(
    songId: string,
    artistId: string,
    json: JSON
  ): Observable<Object> {
    return this.http.put(
      this.songsURL + songId + '/' + this.constantsService.artistsAPI + artistId,
      json,
      {
        headers: this.authService.getHeader(),
      }
    );
  }
}
