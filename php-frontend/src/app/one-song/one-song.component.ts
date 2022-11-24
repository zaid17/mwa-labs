import { Component, OnInit } from '@angular/core';
import { SongsService } from '../songs.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Song } from '../songs/songs.component';
import { ArtistsService } from '../artists.service';
import { AuthService } from '../auth.service';
@Component({
  selector: 'app-one-song',
  templateUrl: './one-song.component.html',
  styleUrls: ['./one-song.component.css'],
})
export class OneSongComponent implements OnInit {
  song: Song;
  get isAuth() {
    return this.authService.isAuth();
  }
  constructor(
    private songsService: SongsService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private artistsService: ArtistsService
  ) {
    this.song = new Song();
    this.song._id = '';
    this.song.publish_year = '0';
    this.song.title = 'not found';
  }

  ngOnInit(): void {
    const id = this.route.snapshot.params['songId'];
    this.songsService.getOneSong(id).subscribe((val) => {
      this.song = JSON.parse(JSON.stringify(val));
    });
  }

  deleteSong() {
    this.songsService.deleteSong(this.song._id).subscribe((val) => {
      this.router.navigate(['songs']);
    });
  }
  goToAddArtist() {
    this.router.navigate([this.song._id+'/add-artist']);
  }
  goToEditSong() {
    this.router.navigate([this.song._id+'/edit-song']);
  }
  goToUpdateSong() {
    this.router.navigate([this.song._id+'/update-song']);
  }
  goToArtist(songId: string, artistId: string) {
    this.router.navigate([songId+'/artist/'+artistId]);
  }
}
