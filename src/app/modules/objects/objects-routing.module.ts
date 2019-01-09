import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ObjectViewComponent } from './components/object-view.component';
import { ObjectDetailsComponent } from './components/object-details.component';

const routes: Routes = [
   { path: '', component: ObjectViewComponent, children: [
      { path: ':objectId', component: ObjectDetailsComponent }
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
