import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ObjectViewComponent } from './components/object-view.component';

const routes: Routes = [
   { path: '', component: ObjectViewComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ObjectsRoutingModule { }
