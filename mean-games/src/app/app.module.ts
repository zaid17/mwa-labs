import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { GamesComponent } from './games/games.component';
import { GamesNavComponent } from './games-nav/games-nav.component';
import { OneGameComponent } from './one-game/one-game.component';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SearchGamesComponent } from './search-games/search-games.component';
import { FormsModule } from '@angular/forms';
import { ErrorPageComponent } from './error-page/error-page.component';
@NgModule({
  declarations: [
    AppComponent,
    GamesComponent,
    GamesNavComponent,
    OneGameComponent,
    HomeComponent,
    SearchGamesComponent,
    ErrorPageComponent,
 
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      {
        path: '',
        component: HomeComponent,
      },
      {
        path: 'games',
        component: GamesComponent,
      },
      {
        path: 'game/:gameId',
        component: OneGameComponent,
      },
      {
        path: 'search-games',
        component: SearchGamesComponent,
      },
      {
        path: '**',
        component: ErrorPageComponent,
      },
    ]),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
