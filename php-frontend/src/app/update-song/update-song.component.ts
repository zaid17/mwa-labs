import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SongsService } from '../songs.service';
import { Song } from '../songs/songs.component';

@Component({
  selector: 'app-update-song',
  templateUrl: './update-song.component.html',
  styleUrls: ['./update-song.component.css'],
})
export class UpdateSongComponent implements OnInit {
  song!: Song;
  songForm = this.fb.group({
    title: [''],
    publish_year: [''],
  });
  constructor(
    private fb: FormBuilder,
    private songsService: SongsService,
    private router: Router,private route:ActivatedRoute
  ) {}

  ngOnInit(): void {
    const songId = this.route.snapshot.params['songId'];
    this.songsService
      .getOneSong(songId)
      .subscribe((val) => {
        this.song = val;

        this.songForm.patchValue({
          publish_year: this.song.publish_year,
          title: this.song.title,
        });
      });
  }
  onSubmit() {
    var updatedSong: any = {};

    if (this.songForm.value.publish_year) {
      console.log('yes');

      updatedSong.publish_year = this.songForm.value.publish_year;
    }
    if (this.songForm.value.title && this.songForm.value.title.length > 0) {
      updatedSong.title = this.songForm.value.title;
    }
    console.log('from', this.songForm.value);

    console.log('updatesong', updatedSong);
    console.log('json', JSON.stringify(updatedSong));

    this.songsService
      .updateSong(this.song._id, JSON.parse(JSON.stringify(updatedSong)))
      .subscribe((val) => {
        this.router.navigate(['songs/' + this.song._id]);
      });

    this.songForm.patchValue({
      publish_year: '',
      title: '',
    });
  }
}
