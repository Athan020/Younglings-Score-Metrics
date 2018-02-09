import { DatabaseService } from './../../services/database/database.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.css']
})
export class LeaderboardComponent implements OnInit {
  sprintNums: number[] = [];

  constructor(protected readonly db: DatabaseService) {
    const highest = db.getNumSprints();
    for (let i = 1; i <= highest; i++) {
      this.sprintNums.push(i);
    }
  }

  ngOnInit() {
  }

}
