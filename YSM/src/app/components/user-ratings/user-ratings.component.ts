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

  constructor(protected db: DatabaseService) {
    db.calcPoAverageHappiness(this.userData.user);
  }

  ngOnInit() {
  }

}
