import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GamesService } from '../games.service';
import { Game } from '../games/games.component';
@Component({
  selector: 'app-one-game',
  templateUrl: './one-game.component.html',
  styleUrls: ['./one-game.component.css'],
})
export class OneGameComponent implements OnInit {
  game: Game = new Game();
  constructor(private route: ActivatedRoute, private service: GamesService) {}

  ngOnInit(): void {
    const id = this.route.snapshot.params['gameId'];
    this.service.getOneGame(id).subscribe((val) => {
      console.log(val);

      this.game = JSON.parse(JSON.stringify(val));
    });
  }
}
