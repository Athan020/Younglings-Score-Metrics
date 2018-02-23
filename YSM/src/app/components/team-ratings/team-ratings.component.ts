import { DatabaseService } from './../../services/database/database.service';
import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';

@Component({
  selector: 'app-team-ratings',
  templateUrl: './team-ratings.component.html',
  styleUrls: ['./team-ratings.component.css']
})
export class TeamRatingsComponent implements OnInit {

  @Input()
  teamData;

  average;
  previousRating;

  constructor(protected db: DatabaseService) {
  }

  ngOnInit() {
    this.db.sprints.subscribe(response => {
      const sprintId = this.teamData.name + '-' + this.teamData.totalSprints;
      const prevSprintId = this.teamData.name + '-' + (this.teamData.totalSprints - 1);
      response.map(element => {
        if (element.id === prevSprintId) {
          this.previousRating = Math.round((element.score / element.ratingsReceived) * 10) / 10;
        } else if (element.id === sprintId) {
          this.average = Math.round((element.score / element.ratingsReceived) * 10) / 10;
        }
      });
    });
  }

}
