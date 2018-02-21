import { AngularFireAuth } from 'angularfire2/Auth/auth';
// import { TeamLeadeComponent } from './../team-leader/team-leader.component';
import { AuthenticationService } from './../../../services/authentication/authentication.service';
// import { Router } from '@angular/router';
import { DatabaseService } from './../../../services/database/database.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-team-member',
  templateUrl: './team-member.component.html',
  styleUrls: ['./team-member.component.css']
})
export class TeamMemberComponent implements OnInit {
  TeamMember;
  team;
  //  PersonalScores;
  //  TeamsAverage;
  //  TeamsVelocity;
  //  Scoreboard;
  //  POsCommets;
  //  POsHappiness;


  //  endDate:Date= new Date();
  //   startDate:Date;

  constructor(protected readonly db: DatabaseService, protected readonly afAuth: AngularFireAuth) { }

  ngOnInit() {

    this.db.users.subscribe(response =>
      response.map(element => {
        if (element.user === this.afAuth.auth.currentUser.uid) {
          this.TeamMember = element;
          //  console.log(this.TeamMember.name)
        }

      })
    );

    this.db.teams.subscribe(response => {
      response.map(element => {
        if (element.name === this.TeamMember.team) {
          this.team = element;
          this.db.getTeamSprint(this.team.name);
          //  this.sprintNum=this.db.teamHighestSprint;
          //  console.log(element.name)
        }

      });
    });

    // this.db.endDate.subscribe(response => {
    //   response.map(element => {
    //     if(element.user === this.afAuth.auth.currentUser.uid){
    //        this.teamMember = element;
    //       //  console.log(element)
    //     }

    //   })
    // })

  }

  onSubmit() {

  }
}


