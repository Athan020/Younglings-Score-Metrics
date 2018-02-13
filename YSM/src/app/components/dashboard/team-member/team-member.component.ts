// import { TeamLeadeComponent } from './../team-leader/team-leader.component';
import { AuthenticationService } from './../../../services/authentication/authentication.service';
import { Router } from '@angular/router';
import { DatabaseService } from './../../../services/database/database.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-team-member',
  templateUrl: './team-member.component.html',
  styleUrls: ['./team-member.component.css']
})
export class TeamMemberComponent implements OnInit {
   EndDate;
   PO;
   POsComment
   POsHappiness;
   POsRating;
   Points;
   Score;
   Startdate;

  constructor(private db: DatabaseService) { }

  ngOnInit() {
    
    // this.PersonalScores = this.db.getScores();
    // public get value() : string {
    //   return PersonalScores
    }

  onSubmit(){
    
  }    
  }


