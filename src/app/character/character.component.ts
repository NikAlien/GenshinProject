import { Component, OnInit } from '@angular/core';
import { Character } from './character';
import { CharacterService } from '../services/character.service';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CharacterDetailComponent } from '../character-detail/character-detail.component';
import { SaveService } from '../services/save.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { Weapon } from '../weapon';
import { ActivatedRoute } from '@angular/router';
import { LoginService } from '../services/login.service';

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
    userID = 1;
    title = "My Characters";
    sortBy = "Default";
    characters: Character[] = [];
    currentPage : number = 1;
    totalEntries : number = 1;
    elementsPerPage : number = 2;
    intervalId : any;
    // defaultWeapon : Weapon = {id: -1, name: '', baseAttack: 0, additionalCharacteristic: '', characteristicNumbers: 0, characterList: []};


    constructor(private charaService: CharacterService, private router : ActivatedRoute, private logInService: LoginService) {
      this.logInService.getUserID().subscribe(id => this.userID = id);
    }
    ngOnInit(): void {
      if(this.logInService.getToken() == null)
        window.location.replace('/login');
      this.getCharas();
      this.intervalId = setInterval(() => {
        let newSize = 0;
        this.charaService.size(this.userID).subscribe(size => newSize = size);
          if(this.totalEntries != newSize)
            this.getCharas();
      }, 5000)

    }

    ngOnDestroy() {
      if (this.intervalId) {
        clearInterval(this.intervalId);
      }
    }

    getCharas(): void {
      if(this.sortBy === "Default")
        this.charaService.getCharacters(this.currentPage, this.elementsPerPage, this.userID)
          .subscribe(characters => {this.characters = characters;});
      if(this.sortBy === "Level")
        this.charaService.sortByLevel(this.currentPage, this.elementsPerPage, this.userID)
          .subscribe(characters => this.characters = characters);
      if(this.sortBy === "Name")
        this.charaService.sortByName(this.currentPage, this.elementsPerPage)
          .subscribe(characters => this.characters = characters);
      this.charaService.size(this.userID)
          .subscribe(size => this.totalEntries = size);
    }

    addNewCharacter(): void {
      var charID : number = -1;
      this.charaService.addCharacter({characterId: -1, name: 'Name', currentLevel: 0, vision: 'anemo', affiliation: 'affiliation', weapon: null}, this.userID)
      .subscribe(id => {
        charID = id;
        window.location.replace('/detail/' + charID);
      });
    }

    updatePage(page : number) : void {
      this.currentPage = page;
      this.getCharas();
    }

    logOut(): void {
      this.logInService.logout();
      this.characters = [];
      window.location.replace('http://localhost:4200/login');
    }
}
