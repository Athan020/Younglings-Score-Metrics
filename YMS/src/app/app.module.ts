import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { TeamMemberComponent } from './components/dashboard/team-member/team-member.component';
import { TeamLeaderComponent } from './components/dashboard/team-leader/team-leader.component';
import { ManagerComponent } from './components/dashboard/manager/manager.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    TeamMemberComponent,
    TeamLeaderComponent,
    ManagerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
