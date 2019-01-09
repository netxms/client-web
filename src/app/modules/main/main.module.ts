import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClarityModule } from '@clr/angular';
import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './components/main.component';
import { WelcomePageComponent } from './components/welcome-page.component';
import { FormsModule } from '@angular/forms';

@NgModule({
   declarations: [
      MainComponent,
      WelcomePageComponent
   ],
   imports: [
      CommonModule,
      FormsModule,
      ClarityModule,
      MainRoutingModule
   ]
})
export class MainModule { }
