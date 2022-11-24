import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConstantsService } from './constants.service';
import { SongsService } from './songs.service';
import { Artisit } from './songs/songs.component';

@Injectable({
  providedIn: 'root',
})
export class ArtistsService {
  constructor(
    private http: HttpClient,
    private constansService: ConstantsService
  ) {}

  public addArtist(json: JSON, songId: string): Observable<Object> {
    return this.http.post(
      this.constansService.baseURL + 'songs/' + songId + '/' + 'artists',
      json
    );
  }

  public getOneArtist(songId: string, artistId: string): Observable<Artisit> {
    return this.http.get<Artisit>(
      this.constansService.baseURL +
        'songs/' +
        songId +
        '/' +
        'artists/' +
        artistId
    );
  }

  public deleteArtist(songId: string, artistId: string): Observable<Object> {
    return this.http.delete(
      this.constansService.baseURL +
        'songs/' +
        songId +
        '/' +
        'artists/' +
        artistId
    );
  }

  public editArtist(
    songId: string,
    artistId: string,
    json: JSON
  ): Observable<Object> {
    return this.http.patch(
      this.constansService.baseURL + 'songs/' + songId + '/artists/' + artistId,
      json
    );
  }
  public updateArtist(
    songId: string,
    artistId: string,
    json: JSON
  ): Observable<Object> {
    return this.http.put(
      this.constansService.baseURL + 'songs/' + songId + '/artists/' + artistId,
      json
    );
  }
}
