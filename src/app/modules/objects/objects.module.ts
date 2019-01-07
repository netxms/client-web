import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClarityModule } from '@clr/angular';
import { ObjectsRoutingModule } from './objects-routing.module';
import { ObjectViewComponent } from './components/object-view.component';
import { ObjectTreeComponent } from './components/object-tree.component';

@NgModule({
  declarations: [ObjectViewComponent, ObjectTreeComponent],
  imports: [
    CommonModule,
    ClarityModule,
    ObjectsRoutingModule
  ]
})
export class ObjectsModule { }
