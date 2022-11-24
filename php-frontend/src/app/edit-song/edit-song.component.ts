import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { SongsService } from '../songs.service';
import { Song } from '../songs/songs.component';

@Component({
  selector: 'app-edit-song',
  templateUrl: './edit-song.component.html',
  styleUrls: ['./edit-song.component.css'],
})
export class EditSongComponent implements OnInit {
  song!: Song;
  songForm = this.fb.group({
    title: [''],
    publish_year: [''],
  });
  constructor(private fb: FormBuilder, private songsService: SongsService,private router:Router,private route:ActivatedRoute) {}

  ngOnInit(): void {
    const id = this.route.snapshot.params['songId'];
    this.songsService
      .getOneSong(id)
      .subscribe((val) => {
        this.song = val;

        this.songForm.patchValue({
          publish_year: this.song.publish_year,
          title: this.song.title,
        });
      });
  }
  onSubmit() {
    this.songsService
      .editSong(this.song._id, JSON.parse(JSON.stringify(this.songForm.value)))
      .subscribe((val) => {
        console.log(val);
        this.router.navigate(['songs/'+this.song._id])
      });

    this.songForm.patchValue({
      publish_year: '',
      title: '',
    });
  }
}
