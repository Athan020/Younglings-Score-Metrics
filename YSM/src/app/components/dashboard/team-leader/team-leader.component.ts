import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../../../services/database/database.service';
import { AngularFireAuth } from 'angularfire2/Auth';

@Component({
  selector: 'app-team-leader',
  templateUrl: './team-leader.component.html',
  styleUrls: ['./team-leader.component.css']
})
export class TeamLeaderComponent implements OnInit {
  teamLeader;
  team;
  currentSprint;

// sprintNum:number;
  velocity:number;

  sprintPoints=0;
  startDate:Date;
  endDate:Date= new Date();


  constructor(protected readonly db: DatabaseService, protected readonly afAuth: AngularFireAuth) { 


  }

  ngOnInit() {

    this.db.users.subscribe(response => 
      response.map(element => {  
        if(element.user === this.afAuth.auth.currentUser.uid){
           this.teamLeader = element;
          //  console.log(element)
        }
   
      })
    );

    this.db.teams.subscribe(response => {
      response.map(element => {  
        if(element.name === this.teamLeader.team){
           this.team = element;
           this.db.getTeamSprint(this.team.name);
          //  this.sprintNum=this.db.teamHighestSprint;
           //  console.log(element.name)
          }
          
        });
    });

    this.db.sprints.subscribe(response => 
      response.map(element => {  
        // if(element.poComment === 'WORK GOTDAMMIT'){
           this.currentSprint = element;
          //  console.log(element)
        // }
   
      })
    )

    // this.db.getTeamSprint(this.team.name);
  }

  editVelocity(velocity:number){
    var teamName=this.team.name;

    this.db.editVelocity(velocity,teamName);
    
}

newSprint(sprintNum){
  
this.db.createSprint(this.teamLeader.team,sprintNum,this.sprintPoints,this.startDate);
this.db.getTeamSprint(this.team.name);
// this.sprintNum=this.db.teamHighestSprint;
// console.log(this.db.teamHighestSprint);
}

endSprint(){
  this.db.editEndDate(this.endDate.toISOString().substr(0,10), this.team.name);
  this.db.getTeamSprint(this.team.name);
  this.sprintPoints = 0;
  // this.db.teamHighestSprint++;
  // console.log(this.db.teamHighestSprint);
}
}
