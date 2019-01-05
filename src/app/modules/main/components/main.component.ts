import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppAlertService, AppAlertSeverity } from '@services/app-alert.service';
import { SessionService } from '@services/session.service';

@Component({
   selector: 'app-main',
   templateUrl: './main.component.html',
   styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
   public showPasswordChangeDialog = false;
   public oldPassword = '';
   public newPassword1 = '';
   public newPassword2 = '';
   public passwordMatchError = false;

   constructor(
      public appAlertService: AppAlertService,
      private sessionService: SessionService,
      private router: Router) { }

   ngOnInit() {
   }

   /**
    * Get display name of logged in user
    */
   getUserName() {
      const session = this.sessionService.getSession();
      return (session != null) ? (session.user.name + '@' + session.server.address) : 'UNKNOWN';
   }

   /**
    * Open password change dialog
    */
   openPasswordChangeDialog() {
      this.oldPassword = '';
      this.newPassword1 = '';
      this.newPassword2 = '';
      this.passwordMatchError = false;
      this.showPasswordChangeDialog = true;
   }

   /**
    * Change password
    */
   changePassword() {
      if (this.newPassword1 === this.newPassword2) {
         this.passwordMatchError = false;
         this.showPasswordChangeDialog = false;
         this.appAlertService.addAlert(AppAlertSeverity.SUCCESS, 'PasswordChange', 'Password successfully changed');
      } else {
         this.passwordMatchError = true;
      }
   }

   /**
    * Do logout
    */
   onLogout() {
      this.sessionService.logout();
      this.router.navigate(['/login']);
   }
}
