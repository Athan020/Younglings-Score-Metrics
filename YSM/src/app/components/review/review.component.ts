import { AngularFireAuth } from 'angularfire2/Auth/auth';
import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../../services/database/database.service';
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

  constructor(private db: DatabaseService, private afAuth: AngularFireAuth) {
    // db.getPoTeam(afAuth.auth.currentUser.uid);
  }

  ngOnInit() {
    // console.log(this.db.poTeam + '-' + this.db.teamHighestSprint, 'Total Sprints');
  }

  commentTest() {
    console.log(this.comment);
    const tot =
      this.teamRating + this.happiness + this.presentation + this.rateWork;
    console.log(tot);
    this.db.poComments(this.comment, this.afAuth.auth.currentUser.uid);
    this.db.updateRatings(tot / 4, tot);
  }
}
