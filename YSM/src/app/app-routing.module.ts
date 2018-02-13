import { ReviewComponent } from './components/review/review.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { AuthguardService } from './services/authguard/authguard.service';
import { RegisterComponent } from './components/register/register.component';
import { TeamMemberComponent } from './components/dashboard/team-member/team-member.component';

const routes: Routes = [ 
    // { path: '', redirectTo: '/dashboard', pathMatch: 'full', canActivate: [AuthguardService]},
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'team-member', component: TeamMemberComponent },
    { path: 'review', component: ReviewComponent, canActivate: [AuthguardService] }

];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule { }
