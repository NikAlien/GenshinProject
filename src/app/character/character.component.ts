import { Component, OnInit } from '@angular/core';
import { Character } from './character';
import { CharacterService } from '../services/character.service';
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
    characters: Character[] = [];

    constructor(private charaService: CharacterService) {}
    ngOnInit(): void {
      this.getCharas();
    }

    getCharas(): void {
      this.charaService.getCharacters()
          .subscribe(characters => this.characters = characters);
    }
}
