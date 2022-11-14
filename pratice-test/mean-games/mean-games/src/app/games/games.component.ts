import { Component, OnInit } from '@angular/core';
import { GamesService } from '../games.service';
import { Router } from '@angular/router';

export class Game {
  title!: string;
  year!: string | number;
  minPlayers!: number;
  maxPlayers!: number;
  _id!: string;
}
@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.css'],
})
export class GamesComponent implements OnInit {
  games: Game[] = [];
  constructor(private gamesService: GamesService, private router: Router) {}

  ngOnInit(): void {
    this.getGames();
  }
  goToGame(id: string) {
    this.router.navigate([`game/${id}`]);
  }
  private offset: number = 0;
  private count: number = 5;
  getGames(): void {
    this.gamesService.getAllGames(this.count, this.offset).subscribe((val) => {
      this.games = JSON.parse(JSON.stringify(val));
    });
  }
  getNext() {
    this.offset += 5;
    this.getGames();
  }
  getPrev() {
    if(this.offset>=5)
    this.offset -= 5;
    this.getGames();
  }
}
