import { DatabaseService } from './../../services/database/database.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.css']
})
export class LeaderboardComponent implements OnInit {
  sprintNums: number[] = [];
  selectedSprint = this.db.highestSprintNum;

  constructor(protected readonly db: DatabaseService) {
    for (let i = 1; i <= this.db.highestSprintNum; i++) {
      this.sprintNums.push(i);
    }
  }

  ngOnInit() {
  }

}
