import { Component, OnInit } from '@angular/core';
import { SongsService } from '../songs.service';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

export class Song {
  title!: string;
  publish_year!: string;
  _id!: string;
  artists: Artisit[] = [];
}

export class Artisit {
  _id!: string;
  name!: string;
  start_year!: string;
}

@Component({
  selector: 'app-songs',
  templateUrl: './songs.component.html',
  styleUrls: ['./songs.component.css'],
})
export class SongsComponent implements OnInit {
  get isAuth() {
    return this.authService.isAuth();
  }
  songs: Song[] = [];
  constructor(
    private songsService: SongsService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.getSongs();
  }

  getSongs() {
    this.songsService.getSongs().subscribe((val) => {
      this.songs = JSON.parse(JSON.stringify(val));
    });
  }

  goToSongPage(id: string) {
    this.router.navigate([`songs/${id}`]);
  }

  deleteSong(id: string) {
    this.songsService.deleteSong(id).subscribe((val) => {
      console.log(val);
      this.getSongs();
    });
  }
}
