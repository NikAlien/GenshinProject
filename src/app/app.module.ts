import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CharacterComponent } from './character/character.component';
import { CharacterDetailComponent } from './character-detail/character-detail.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    CharacterComponent,
    CharacterDetailComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
