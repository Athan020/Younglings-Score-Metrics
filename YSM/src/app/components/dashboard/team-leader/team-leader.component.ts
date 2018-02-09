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
  constructor(protected readonly db: DatabaseService, protected readonly afAuth: AngularFireAuth) { }

  ngOnInit() {

    this.db.users.subscribe(response => 
      response.map(element => {  
        if(element.user === this.afAuth.auth.currentUser.uid){
           this.teamLeader = element;
           console.log(element)
        }
   
      })
    )

    // this.db.squads.subscribe(response => 
    //   response.map(element => {  
    //     // if(element.user === this.afAuth.auth.currentUser.uid){
    //        this.team = element;
    //        console.log(element)
    //     // }
   
    //   })
    // )

    // this.db.sprints.subscribe(response => 
    //   response.map(element => {  
    //     // if(element.user === this.afAuth.auth.currentUser.uid){
    //        this.currentSprint = element;
    //        console.log(element)
    //     // }
   
    //   })
    // )


  }

}
