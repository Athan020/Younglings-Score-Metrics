import { AuthenticationService } from './../../services/authentication/authentication.service';
import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../../services/database/database.service';
import { Comment } from '@angular/compiler';
import { AngularFireAuth } from 'angularfire2/Auth';

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
  currentSprint: number;
  Reviewopen: false;
  ReviewClosed: true;
  sprint = [];
  sprintNum;

  constructor(private db: DatabaseService, private afAuth: AngularFireAuth, private auth: AuthenticationService) {
  }


  ngOnInit() {
     this.db.users.subscribe(r => {
      this.db.teams.subscribe(response => {
        this.db.sprints.subscribe(res => {
          this.sprint = response.filter((team) => {
            let flag = false;
            r.map(el => {
              if (el.user === this.auth.getUID() && el.team === team.name) {
                let includesTeam = false;
                if (el.teamsRated !== undefined) {
                  includesTeam = el.teamsRated.includes(team.name);
                }
                if (!includesTeam) {
                  res.map(e => {
                    if (e.id.includes(team.name) && e.open) {
                      this.sprintNum = e.id;
                      flag = true;
                    }
                  });
                }
              }
            });
            return flag;
          });
        });
      });
    });
  }


 get isOpen(): boolean{
   return this.ReviewClosed ;
 }

  review() {
    // console.log(this.comment);
    const tot = (this.teamRating + this.happiness + this.presentation + this.rateWork) ;
    // console.log(tot / 4);
    // console.log( this.afAuth.auth.currentUser.uid);
    this.db.poComments(this.comment, this.afAuth.auth.currentUser.uid);
    this.db.updateRatings(tot / 4, this.sprintNum);
    // this.db.checkOpen();

  }
}
