import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ArtistsService } from '../artists.service';
import { Artisit } from '../songs/songs.component';

@Component({
  selector: 'app-one-artist',
  templateUrl: './one-artist.component.html',
  styleUrls: ['./one-artist.component.css'],
})
export class OneArtistComponent implements OnInit {
  artist: Artisit = new Artisit();
  constructor(
    private artistService: ArtistsService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const songId = this.route.snapshot.params['songId'];
    const artistId = this.route.snapshot.params['artistId'];
    this.artistService.getOneArtist(songId, artistId).subscribe((val) => {
      this.artist = JSON.parse(JSON.stringify(val));
    });
  }

  deleteArtist() {
    const songId = this.route.snapshot.params['songId'];
    const artistId = this.route.snapshot.params['songId'];
    this.artistService
      .deleteArtist(songId, this.artist._id)
      .subscribe((val) => {
        this.router.navigate(['songs/' + songId]);
      });
  }
  goToEditArtist() {
   // this.router.navigate([this.song._id+'/edit-song']);
  }
  goToUpdateArtist() {
  //  this.router.navigate([this.song._id+'/update-song']);
  }
}
