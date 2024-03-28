import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CharacterComponent } from './character/character.component';
import { CharacterDetailComponent } from './character-detail/character-detail.component';
import { PieChartComponent } from './pie-chart/pie-chart.component';

const routes: Routes = [
  {path: '', redirectTo: '/characterList', pathMatch: 'full'},
  {path: 'characterList', component: CharacterComponent},
  {path: 'detail/:id', component: CharacterDetailComponent},
  {path: 'pie-chart', component: PieChartComponent}
]

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
