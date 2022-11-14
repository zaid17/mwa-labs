import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SongsDataService } from '../songs-data.service';
@Component({
  selector: 'app-snogs',
  templateUrl: './snogs.component.html',
  styleUrls: ['./snogs.component.css'],
})
export class SnogsComponent implements OnInit {
  songs: Song[] = [];

  constructor(private songsService: SongsDataService, private router: Router) {}

  goToOneSongComponent(id: string) {
    this.router.navigate([`song/${id}`], { state: { example: 'bar' } });
  }
  getSongs(): void {
    this.songsService.getSongs().subscribe((data) => {
      this.songs = [];
      for (let d of data) {
        const obj = JSON.parse(JSON.stringify(d)) as Song;
        this.songs.push(new Song(obj.publish_year, obj.title, obj._id));
      }
    });
  }
  deleteSong(id: string) {
    this.songsService.deleteSong(id).subscribe((val) => {
      console.log(val);
      this.getSongs();
    });
  }

  ngOnInit(): void {
    console.log('calling on song get');

    this.getSongs();
  }
}

export class Song {
  publish_year: number;
  title: string;
  _id: string;

  constructor(publishYear: number, title: string, id: string) {
    this.publish_year = publishYear;
    this.title = title;
    this._id = id;
  }
}
