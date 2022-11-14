import { Component, OnInit } from '@angular/core';
import { Song } from '../song.module';
import { SongsService } from '../songs.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-one-song',
  templateUrl: './one-song.component.html',
  styleUrls: ['./one-song.component.css'],
})
export class OneSongComponent implements OnInit {
  song: Song;
  constructor(
    private songsService: SongsService,
    private router: ActivatedRoute,
    private route: Router
  ) {
    this.song = new Song();
    this.song._id = '';
    this.song.publish_year = 0;
    this.song.title = 'not found';
  }

  ngOnInit(): void {
    const id = this.router.snapshot.params['id'];
    this.songsService.getOneSong(id).subscribe((val) => {
      this.song = JSON.parse(JSON.stringify(val));
    });
  }

  deleteSong() {
    this.songsService.deleteSong(this.song._id).subscribe((val) => {
      this.route.navigate(['songs']);
    });
  }
}
