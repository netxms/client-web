import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClarityModule } from '@clr/angular';
import { AngularSplitModule } from 'angular-split';
import { ObjectsRoutingModule } from './objects-routing.module';
import { ObjectViewComponent } from './components/object-view.component';
import { ObjectTreeComponent } from './components/object-tree.component';
import { SharedComponentsModule } from '@app/components/shared-components.module';
import { ObjectDetailsComponent } from './components/object-details.component';
import { ObjectSummaryComponent } from './components/object-summary.component';
import { ObjectAlarmsComponent } from './components/object-alarms.component';
import { NodePerformanceComponent } from './components/node-performance.component';
import { InterfacesComponent } from './components/interfaces.component';

@NgModule({
  declarations: [
     ObjectViewComponent,
     ObjectTreeComponent,
     ObjectDetailsComponent,
     ObjectSummaryComponent,
     ObjectAlarmsComponent,
     NodePerformanceComponent,
     InterfacesComponent
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
