import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { NavigatorComponent } from './navigator/navigator.component';
import { HomeComponent } from './home/home.component';
import { SnogsComponent } from './snogs/snogs.component';
import { RouterModule } from '@angular/router';
import { FooterComponent } from './footer/footer.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { OneSongComponent } from './one-song/one-song.component';
import { AddSongComponent } from './add-song/add-song.component';
/*
fetch data from the service  👍
send data from parent to child '👌
send data from child to parent
reacitve forms
*/
@NgModule({
  declarations: [
    AppComponent,
    NavigatorComponent,
    HomeComponent,
    SnogsComponent,
    FooterComponent,
    LoginComponent,
    OneSongComponent,
    AddSongComponent,
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
        component: SnogsComponent,
      },
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: 'song/:songId',
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
