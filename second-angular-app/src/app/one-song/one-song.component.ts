import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Song } from '../snogs/snogs.component';
import { SongsDataService } from '../songs-data.service';

@Component({
  selector: 'app-one-song',
  templateUrl: './one-song.component.html',
  styleUrls: ['./one-song.component.css'],
})
export class OneSongComponent implements OnInit {
  song: Song = new Song(0, '', '');
  songId!: string;
  constructor(
    private songsService: SongsDataService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.songId = this.route.snapshot.params['songId'];

    this.songsService.getSong(this.songId).subscribe((data) => {
      const obj = JSON.parse(JSON.stringify(data)) as Song;
      if (obj) this.song = new Song(obj.publish_year, obj.title, obj._id);
      else {
        this.song = new Song(0, 'obj.title', 'obj._id');
      }
    });
  }
}
