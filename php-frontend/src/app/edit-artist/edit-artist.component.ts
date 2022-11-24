import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ArtistsService } from '../artists.service';
import { SongsService } from '../songs.service';
import { Artisit, Song } from '../songs/songs.component';

@Component({
  selector: 'app-edit-artist',
  templateUrl: './edit-artist.component.html',
  styleUrls: ['./edit-artist.component.css']
})
export class EditArtistComponent implements OnInit {
  artist!: Artisit;
  artistForm = this.fb.group({
    name: [''],
    start_year: [''],
  });
  constructor(private fb: FormBuilder, private artistService: ArtistsService,private router:Router,private route:ActivatedRoute) {}

  ngOnInit(): void {
    const songId = this.route.snapshot.params['songId'];
    const artistId = this.route.snapshot.params['artistId'];
    this.artistService
      .getOneArtist(songId,artistId)
      .subscribe((val) => {
        this.artist = val;

        this.artistForm.patchValue({
          start_year: this.artist.start_year,
          name: this.artist.name,
        });
      });
  }
  onSubmit() {
    const songId = this.route.snapshot.params['songId'];
    this.artistService
      .editArtist(songId,this.artist._id, JSON.parse(JSON.stringify(this.artistForm.value)))
      .subscribe((val) => {
        console.log(val);
        this.router.navigate(['songs/'+this.artist._id])
      });

    this.artistForm.patchValue({
      start_year: '',
      name: '',
    });
  }
}