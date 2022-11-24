import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Routes } from '@angular/router';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { ArtistsService } from '../artists.service';
import { SongsService } from '../songs.service';
@Component({
  selector: 'app-add-song',
  templateUrl: './add-song.component.html',
  styleUrls: ['./add-song.component.css'],
})
export class AddSongComponent implements OnInit {
  songForm = this.fb.group({
    title: [''],
    publish_year: [''],
  });
  constructor(private fb: FormBuilder, private songsServie: SongsService) {}

  ngOnInit(): void {}

  onSubmit() {
    this.songsServie
      .addSong(JSON.parse(JSON.stringify(this.songForm.value)))
      .subscribe((val) => {
        console.log(val);
      });

    this.songForm.patchValue({
      publish_year: '',
      title: '',
    });
  }
}
