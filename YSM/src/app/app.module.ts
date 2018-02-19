import { UserRatingsComponent } from './components/user-ratings/user-ratings.component';
import { TeamRatingsComponent } from './components/team-ratings/team-ratings.component';
import { LeaderboardComponent } from './components/leaderboard/leaderboard.component';
import { ReviewComponent } from './components/review/review.component';
import { DatabaseService } from './services/database/database.service';
import { AuthguardService } from './services/authguard/authguard.service';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireAuth } from 'angularfire2/Auth/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AuthenticationService } from './services/authentication/authentication.service';
import { AngularFirestore, AngularFirestoreModule } from 'angularfire2/firestore';
import { ZippyComponent } from './components/zippy/zippy.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { TeamMemberComponent } from './components/dashboard/team-member/team-member.component';
import { TeamLeaderComponent } from './components/dashboard/team-leader/team-leader.component';
import { ManagerComponent } from './components/dashboard/manager/manager.component';
import { AmChartsModule } from "@amcharts/amcharts3-angular";
import { BurndownChartComponent } from './components/burndown-chart/burndown-chart.component';

export const firebaseConfig = {
  apiKey: 'AIzaSyAMd8N_5k9klj1df29Lr_xihZKXYagcvbI',
  authDomain: 'younglings-score-metrics.firebaseapp.com',
  databaseURL: 'https://younglings-score-metrics.firebaseio.com',
  projectId: 'younglings-score-metrics',
  storageBucket: 'younglings-score-metrics.appspot.com',
  messagingSenderId: '352622976784'
};

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ReviewComponent,
    ZippyComponent,
    DashboardComponent,
    TeamMemberComponent,
    TeamLeaderComponent,
    ManagerComponent,
    LeaderboardComponent,
    TeamRatingsComponent,
    UserRatingsComponent,
    BurndownChartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFirestoreModule,
    AmChartsModule
  ],
  providers: [AngularFireAuth, AuthguardService, AuthenticationService, DatabaseService],
  bootstrap: [AppComponent]
})
export class AppModule { }
