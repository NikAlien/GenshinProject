import { Component, OnInit } from '@angular/core';
import { Character } from './character';
import { CharacterService } from '../services/character.service';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CharacterDetailComponent } from '../character-detail/character-detail.component';
import { SaveService } from '../services/save.service';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  standalone: true,
  imports: [
    NgFor,
    FormsModule,
    NgIf,
    CharacterDetailComponent,
    NgxPaginationModule
  ],
  selector: 'app-character',
  templateUrl: './character.component.html',
  styleUrl: './character.component.scss'
})

export class CharacterComponent {
    title = "My Characters";
    sortBy = "Default";
    characters: Character[] = [];
    currentPage : number = 1;
    totalEntries : number = 1;
    elementsPerPage : number = 2;

    constructor(private charaService: CharacterService) {}
    ngOnInit(): void {
      this.getCharas();
    }

    getCharas(): void {
      if(this.sortBy === "Default")
        this.charaService.getCharacters(this.currentPage, this.elementsPerPage)
          .subscribe(characters => {this.characters = characters; console.log(characters)});
      if(this.sortBy === "Level")
        this.charaService.sortByLevel(this.currentPage, this.elementsPerPage)
          .subscribe(characters => this.characters = characters);
      if(this.sortBy === "Name")
        this.charaService.sortByName(this.currentPage, this.elementsPerPage)
          .subscribe(characters => this.characters = characters);
      this.charaService.size()
          .subscribe(size => this.totalEntries = size);
    }

    addNewCharacter(): void {
      var charID : number = -1;
      this.charaService.addCharacter({id: -1, name: 'Name', currentLevel: 0, vision: 'anemo', affiliation: 'affiliation'})
      .subscribe(id => {
        charID = id;
        window.location.replace('/detail/' + charID);
      });
    }

    updatePage(page : number) : void {
      this.currentPage = page;
      this.getCharas();
    }
}
