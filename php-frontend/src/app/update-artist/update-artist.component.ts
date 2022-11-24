import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ArtistsService } from '../artists.service';
import { Artisit } from '../songs/songs.component';

@Component({
  selector: 'app-update-artist',
  templateUrl: './update-artist.component.html',
  styleUrls: ['./update-artist.component.css'],
})
export class UpdateArtistComponent implements OnInit {
  artist!: Artisit;
  artistForm = this.fb.group({
    name: [''],
    start_year: [''],
  });
  constructor(
    private fb: FormBuilder,
    private artistService: ArtistsService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const songId = this.route.snapshot.params['songId'];
    const artistId = this.route.snapshot.params['artistId'];
    this.artistService.getOneArtist(songId, artistId).subscribe((val) => {
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
      .updateArtist(
        songId,
        this.artist._id,
        JSON.parse(JSON.stringify(this.artistForm.value))
      )
      .subscribe((val) => {
        console.log(val);
        this.router.navigate([songId+'/artist/'+this.artist._id])
      });

    this.artistForm.patchValue({
      start_year: '',
      name: '',
    });
  }
}
