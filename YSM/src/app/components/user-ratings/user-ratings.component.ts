import { DatabaseService } from './../../services/database/database.service';
import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';

@Component({
  selector: 'app-user-ratings',
  templateUrl: './user-ratings.component.html',
  styleUrls: ['./user-ratings.component.css']
})
export class UserRatingsComponent implements OnInit {

  @Input()
  userData;

  average: number;
  constructor(protected db: DatabaseService) {
  }

  ngOnInit() {
    this.db.calcPoAverageHappiness(this.userData.user);
    this.average = Math.round((this.userData.rating / this.userData.totalSprints) * 10) / 10;
  }

}
