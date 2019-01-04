import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './components/main.component';
import { WelcomePageComponent } from './components/welcome-page.component';

const routes: Routes = [
   {
      path: '', component: MainComponent, children: [
         { path: '', pathMatch: 'full', component: WelcomePageComponent },
         { path: 'configuration', loadChildren: '@modules/configuration/configuration.module#ConfigurationModule' },
         { path: 'dashboards', loadChildren: '@modules/dashboards/dashboards.module#DashboardsModule' },
         { path: 'objects', loadChildren: '@modules/objects/objects.module#ObjectsModule' },
         { path: 'world-map', loadChildren: '@modules/world-map/world-map.module#WorldMapModule' }
      ]
   }
];

@NgModule({
   imports: [RouterModule.forChild(routes)],
   exports: [RouterModule]
})
export class MainRoutingModule { }
