import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from '@services/auth-guard.service';

const routes: Routes = [
   { path: 'login', loadChildren: '@modules/login/login.module#LoginModule' },
   { path: 'main',
      canActivate: [AuthGuardService],
      canActivateChild: [AuthGuardService],
      loadChildren: '@modules/main/main.module#MainModule'
   },
   { path: '**', redirectTo: '/main' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: false })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
