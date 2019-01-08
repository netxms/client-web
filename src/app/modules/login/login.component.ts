import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SessionService, SessionHandle } from '@services/session.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
   selector: 'app-login',
   templateUrl: './login.component.html',
   styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
   login = '';
   password = '';
   loginStarted = false;
   returnUrl: string;
   errorMessage: string;

   constructor(
      private sessionService: SessionService,
      private route: ActivatedRoute,
      private router: Router) {
   }

   ngOnInit() {
      this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
   }

   onSubmit() {
      var subscription = this.sessionService.login(this.login, this.password)
         .subscribe(
            (s: SessionHandle) => {
               this.errorMessage = null;
               this.router.navigate([this.returnUrl]);
               subscription.unsubscribe();
            },
            (e: HttpErrorResponse) => {
               this.loginStarted = false;
               this.errorMessage = this.sessionService.getErrorDescription();
            }
      );
   }
}
