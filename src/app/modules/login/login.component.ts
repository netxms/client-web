import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SessionService } from '@services/session.service';

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

   constructor(
      private sessionService: SessionService,
      private route: ActivatedRoute,
      private router: Router) {
   }

   ngOnInit() {
      this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
   }

   onSubmit() {
      this.sessionService.login(this.login, this.password);
      this.router.navigate([this.returnUrl]);
   }
}
