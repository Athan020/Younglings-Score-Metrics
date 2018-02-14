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

  constructor(protected db: DatabaseService) {
  }

  ngOnInit() {
    this.average = Math.round((this.teamData.rating / this.teamData.totalSprints) * 10) / 10;
  }

}
