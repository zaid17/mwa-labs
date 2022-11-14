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
@NgModule({
  declarations: [
    AppComponent,
    NavigatorComponent,
    HomeComponent,
    SongsComponent,
    OneSongComponent,
    AddSongComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
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
        path: 'songs/:id',
        component: OneSongComponent,
      },
      {
        path: 'add-song',
        component: AddSongComponent,
      },
    ]),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
