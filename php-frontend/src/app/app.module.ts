import { Component, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { NavigatorComponent } from './navigator/navigator.component';
import { HomeComponent } from './home/home.component';
import { SongsComponent } from './songs/songs.component';
import { OneSongComponent } from './one-song/one-song.component';
import { HttpClientModule } from '@angular/common/http';
import { AddSongComponent } from './add-song/add-song.component';
import { FooterComponent } from './footer/footer.component';
import { AddArtistComponent } from './add-artist/add-artist.component';
import { OneArtistComponent } from './one-artist/one-artist.component';
import { EditSongComponent } from './edit-song/edit-song.component';
import { UpdateSongComponent } from './update-song/update-song.component';
import { EditArtistComponent } from './edit-artist/edit-artist.component';
import { UpdateArtistComponent } from './update-artist/update-artist.component';
import { SignupComponent } from './signup/signup.component';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
@NgModule({
  declarations: [
    AppComponent,
    NavigatorComponent,
    HomeComponent,
    SongsComponent,
    OneSongComponent,
    AddSongComponent,
    FooterComponent,
    AddArtistComponent,
    OneArtistComponent,
    EditSongComponent,
    UpdateSongComponent,
    EditArtistComponent,
    UpdateArtistComponent,
    SignupComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forRoot([
      {
        path: '',
        component: HomeComponent,
      },
      {
        path: 'songs',
        component: SongsComponent,
      },
      {
        path: 'songs/:songId',
        component: OneSongComponent,
      },
      {
        path: ':songId/add-artist',
        component: AddArtistComponent,
      },
      {
        path: 'add-song',
        component: AddSongComponent,
      },
      {
        path: ':songId/edit-song',
        component: EditSongComponent,
      },
      {
        path: ':songId/update-song',
        component: UpdateSongComponent,
      },
      {
        path: ':songId/artist/:artistId',
        component: OneArtistComponent,
      },
      {
        path: ':songId/artist/:artistId/edit-artist',
        component: EditArtistComponent,
      },
      {
        path: ':songId/artist/:artistId/update-artist',
        component: UpdateArtistComponent,
      },
      {
        path: 'sign-up',
        component: SignupComponent,
      },
      {
        path: 'login',
        component: LoginComponent,
      },
    ]),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
