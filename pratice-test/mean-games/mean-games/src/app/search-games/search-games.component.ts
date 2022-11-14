import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { GamesService } from '../games.service';
import { Game } from '../games/games.component';

@Component({
  selector: 'app-search-games',
  templateUrl: './search-games.component.html',
  styleUrls: ['./search-games.component.css'],
})
export class SearchGamesComponent implements OnInit {
  games: Game[] = [];
  title!: string;

  constructor(private service: GamesService) {}

  ngOnInit(): void {}

  search(title: string) {
    console.log(title);
    
    this.service.search(title).subscribe(val=>{
      this.games=JSON.parse(JSON.stringify(val));
    });
  }
}
