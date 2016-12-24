import { NgModule } from '@angular/core';
import { DashboardComponent } from './dashboard.component';
import { CommonModule } from '@angular/common';
import { routing } from './dashboard.routing';

@NgModule({
  imports: [
    CommonModule,
    routing
  ],
  declarations: [
    DashboardComponent
  ],
  bootstrap: [
    DashboardComponent
  ]
})
export class DashboardModule {}
