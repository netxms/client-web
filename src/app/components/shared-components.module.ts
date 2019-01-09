import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiErrorMessageComponent } from './api-error-message.component';
import { ClarityModule } from '@clr/angular';

@NgModule({
   declarations: [
      ApiErrorMessageComponent
   ],
   imports: [
      CommonModule,
      ClarityModule
   ],
   exports: [
      ApiErrorMessageComponent
   ]
})
export class SharedComponentsModule { }
