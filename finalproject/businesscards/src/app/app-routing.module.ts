import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { BusniessCardsComponent } from './busniess-cards/busniess-cards.component';
import { 
  AuthGuardGuard as AuthGuard 
} from './auth-guard.guard';

const routes: Routes = [
	{ path: 'login', component: LoginComponent },
	{ path: '', component: LoginComponent },
	{ path: 'busniessCards',component: BusniessCardsComponent,canActivate: [AuthGuard]},
	{ path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
