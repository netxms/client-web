import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ObjectViewComponent } from './components/object-view.component';
import { ObjectDetailsComponent } from './components/object-details.component';
import { ObjectSummaryComponent } from './components/object-summary.component';
import { ObjectAlarmsComponent } from './components/object-alarms.component';
import { NodePerformanceComponent } from './components/node-performance.component';
import { InterfacesComponent } from './components/interfaces.component';

const routes: Routes = [
   { path: '', component: ObjectViewComponent, children: [
      { path: ':objectId', component: ObjectDetailsComponent, children: [
         { path: '', redirectTo: 'summary' },
         { path: 'alarms', component: ObjectAlarmsComponent },
         { path: 'interfaces', component: InterfacesComponent },
         { path: 'performance', component: NodePerformanceComponent },
         { path: 'summary', component: ObjectSummaryComponent },
         { path: '**', redirectTo: 'summary' }
      ] }
   ] },
];

@NgModule({
  imports: [
     RouterModule.forChild(routes)
   ],
  exports: [
     RouterModule
   ]
})
export class ObjectsRoutingModule { }
