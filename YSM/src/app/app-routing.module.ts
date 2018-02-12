import { ReviewComponent } from './components/review/review.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { AuthguardService } from './services/authguard/authguard.service';
import { RegisterComponent } from './components/register/register.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { TeamLeaderComponent } from './components/dashboard/team-leader/team-leader.component';
import { ManagerComponent } from './components/dashboard/manager/manager.component';
import { TeamMemberComponent } from './components/dashboard/team-member/team-member.component';

const routes: Routes = [
    { path: '', redirectTo: '/dashboard', pathMatch: 'full'},
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'dashboard', component: DashboardComponent, canActivate: [AuthguardService] },
    {path: '**', redirectTo: '/dashboard', pathMatch: 'full'}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule { }
