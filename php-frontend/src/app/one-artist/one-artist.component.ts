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
  songId = this.route.snapshot.params['songId'];
  artistId = this.route.snapshot.params['artistId'];
  constructor(
    private artistService: ArtistsService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.artistService
      .getOneArtist(this.songId, this.artistId)
      .subscribe((val) => {
        this.artist = JSON.parse(JSON.stringify(val));
      });
  }

  deleteArtist() {
    this.artistService
      .deleteArtist(this.songId, this.artist._id)
      .subscribe((val) => {
        this.router.navigate(['songs/' + this.songId]);
      });
  }
  goToEditArtist() {
    this.router.navigate([
      this.songId + '/artist/' + this.artistId + '/edit-artist',
    ]);
  }
  goToUpdateArtist() {
    this.router.navigate([
      this.songId + '/artist/' + this.artistId + '/update-artist',
    ]);
  }
}
