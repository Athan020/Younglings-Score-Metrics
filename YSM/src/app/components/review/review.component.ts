import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../../services/database/database.service';
import { AuthenticationService } from '../../services/authentication/authentication.service';
import { Comment } from '@angular/compiler';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit {
  teamRating: number;
  presentation: number;
  rateWork: number;
  happiness: number;
  comment: String;

  constructor(private db: DatabaseService) {}

  ngOnInit() {}

  // getX(x) {
  //   this.l = this.l + x / 4;
  //   console.log(this.l + 'X here');
  // }

  commentTest() {
    console.log(this.comment);
    const tot = this.teamRating + this.happiness + this.presentation + this.rateWork;
    console.log(tot);
    this.db.updateRatings(tot / 4, tot);
  }
}
