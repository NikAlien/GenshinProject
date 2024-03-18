import { Component } from '@angular/core';
import { Character } from './character';
import { Charas } from '../mock-character';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CharacterDetailComponent } from '../character-detail/character-detail.component';

@Component({
  standalone: true,
  imports: [
    NgFor,
    FormsModule,
    NgIf,
    CharacterDetailComponent
  ],
  selector: 'app-character',
  templateUrl: './character.component.html',
  styleUrl: './character.component.scss'
})
export class CharacterComponent {
    title = "My Characters";

    characters = Charas;
    selectedChara?: Character;
    
    onSelect(chara: Character): void {
      this.selectedChara = chara
    }
}
