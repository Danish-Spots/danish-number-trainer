import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { PlayComponent } from './play/play.component';

const routes: Routes = [
  {
    path: 'play/:lowest/:highest',
    component: PlayComponent,
  },
  {
    path: '',
    component: AppComponent,
  },
  {
    path: '**',
    component: AppComponent,
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
