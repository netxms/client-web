import { Component, OnInit, Input } from '@angular/core';

@Component({
   selector: 'nx-api-error-message',
   templateUrl: './api-error-message.component.html',
   styleUrls: ['./api-error-message.component.css']
})
export class ApiErrorMessageComponent implements OnInit {
   @Input('error-object') errorObject: any;

   constructor() { }

   ngOnInit() {
   }

   getErrorMessage() {
      if (this.errorObject == null) {
         return '';
      }
      if ((this.errorObject.error != null) && (this.errorObject.error.description != null)) {
         return this.errorObject.error.description;
      }
      if ((this.errorObject.status != null) && (this.errorObject.status !== 0) && (this.errorObject.statusText != null)) {
         return this.errorObject.status + ' ' + this.errorObject.statusText;
      }
      if (this.errorObject.message != null) {
         return this.errorObject.message;
      }
      return JSON.stringify(this.errorObject);
   }
}
