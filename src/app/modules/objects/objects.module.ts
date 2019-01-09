import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClarityModule } from '@clr/angular';
import { AngularSplitModule } from 'angular-split';
import { ObjectsRoutingModule } from './objects-routing.module';
import { ObjectViewComponent } from './components/object-view.component';
import { ObjectTreeComponent } from './components/object-tree.component';
import { SharedComponentsModule } from '@app/components/shared-components.module';
import { ObjectDetailsComponent } from './components/object-details.component';

@NgModule({
  declarations: [
     ObjectViewComponent,
     ObjectTreeComponent,
     ObjectDetailsComponent
   ],
  imports: [
    CommonModule,
    ClarityModule,
    AngularSplitModule.forChild(),
    ObjectsRoutingModule,
    SharedComponentsModule
  ]
})
export class ObjectsModule { }
