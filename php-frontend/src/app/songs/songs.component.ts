import { Component, OnInit } from '@angular/core';
import { Song } from '../song.module';
import { SongsService } from '../songs.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-songs',
  templateUrl: './songs.component.html',
  styleUrls: ['./songs.component.css'],
})
export class SongsComponent implements OnInit {
  songs: Song[] = [];
  constructor(private songsService: SongsService, private router: Router) {}

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
