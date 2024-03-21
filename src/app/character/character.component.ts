import { Component, OnInit } from '@angular/core';
import { Character } from './character';
import { CharacterService } from '../services/character.service';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CharacterDetailComponent } from '../character-detail/character-detail.component';
import { SaveService } from '../services/save.service';

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
    sortBy = "Default";
    characters: Character[] = [];

    constructor(private charaService: CharacterService) {}
    ngOnInit(): void {
      this.getCharas();
    }

    getCharas(): void {
      if(this.sortBy === "Default")
        this.charaService.getCharacters()
          .subscribe(characters => this.characters = characters);
      if(this.sortBy === "Level")
        this.charaService.sortByLevel()
          .subscribe(characters => this.characters = characters);
      
    }

    addNewCharacter(): void {
      let charaID = this.charaService.addCharacter({id: -1, name: '', currentLevel: -1, vision: '', affiliation: ''});
      SaveService.save(this.charaService);
      window.location.replace('/detail/' + charaID);
    }
}
