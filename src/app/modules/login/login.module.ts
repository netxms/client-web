import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { ClarityModule } from '@clr/angular';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';

@NgModule({
   declarations: [
      LoginComponent
   ],
   imports: [
      CommonModule,
      FormsModule,
      ClarityModule,
      LoginRoutingModule
   ]
})
export class LoginModule { }
