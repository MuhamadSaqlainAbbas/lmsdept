import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MainComponent} from './main.component';
import {TimeTableComponent} from './time-table/time-table.component';

const routes: Routes = [
  {
    path: '', component: MainComponent, children: [
      { path: 'timeTable', component: TimeTableComponent },
      { path: '', redirectTo: 'home', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
