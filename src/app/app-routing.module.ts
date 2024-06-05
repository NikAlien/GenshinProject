import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CharacterComponent } from './character/character.component';
import { CharacterDetailComponent } from './character-detail/character-detail.component';
import { PieChartComponent } from './pie-chart/pie-chart.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'characterList/user/:id', component: CharacterComponent},
  {path: 'detail/:id', component: CharacterDetailComponent},
  {path: 'pie-chart', component: PieChartComponent},
  {path: 'login', component: LoginComponent},
]

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
