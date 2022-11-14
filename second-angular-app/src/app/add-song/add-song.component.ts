import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Song } from '../snogs/snogs.component';
import { SongsDataService } from '../songs-data.service';
@Component({
  selector: 'app-add-song',
  templateUrl: './add-song.component.html',
  styleUrls: ['./add-song.component.css'],
})
export class AddSongComponent implements OnInit {
  addSongForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private songsService: SongsDataService,
    private router: Router
  ) {
    this.addSongForm = this.fb.group({
      title: '',
      publish_year: '',
    });
  }

  ngOnInit(): void {}

  onSubmit(form: FormGroup): void {
    this.songsService.addSong(form.value).subscribe((val) => {
      console.log(val);

      if (val && val._id) this.router.navigate(['songs']);
    });
  }
}
