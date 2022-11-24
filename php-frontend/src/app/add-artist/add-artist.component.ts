import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ArtistsService } from '../artists.service';
import { Song } from '../songs/songs.component';

@Component({
  selector: 'app-add-artist',
  templateUrl: './add-artist.component.html',
  styleUrls: ['./add-artist.component.css'],
})
export class AddArtistComponent implements OnInit {
  songId!: string;
  artistForm = this.fb.group({
    name: [''],
    start_year: [''],
  });
  constructor(
    private fb: FormBuilder,
    private artistsServie: ArtistsService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {}

  onSubmit() {
    const id = this.route.snapshot.params['songId'];
    console.log(id);
    
    this.artistsServie
      .addArtist(JSON.parse(JSON.stringify(this.artistForm.value)), id)
      .subscribe((val) => {});

    this.artistForm.patchValue({
      start_year: '',
      name: '',
    });
  }
}
