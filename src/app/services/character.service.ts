import { Injectable } from '@angular/core';
import { CHARACTERS } from './mock-character';
import { Character } from '../character/character';
import { Observable, of } from 'rxjs';
import { Savable } from './savable';
import { SaveService } from './save.service';

@Injectable({
  providedIn: 'root'
})
export class CharacterService implements Savable{

  saveData(): void {
    window.sessionStorage.setItem('CHARASERVICE', JSON.stringify(CHARACTERS));
  }

  loadData(): void {
    let saveState: string | null = window.sessionStorage.getItem('CHARASERVICE');
    if (saveState != null) {
      let result: Character[] = JSON.parse(saveState);
      CHARACTERS.splice(0, CHARACTERS.length);
      result.forEach(entity => CHARACTERS.push(entity))
    }
  }
  constructor() { 
    SaveService.load(this);
  }

  getCharacters(): Observable<Character[]> {
    const charas = of(CHARACTERS)
    return charas;
  }

  sortByLevel(): Observable<Character[]> {
    const charas = of(CHARACTERS.toSorted((a, b) => b.currentLevel - a.currentLevel))
    return charas;
  }

  getCharacter(id: number): Character{
    for(let i = 0; i < CHARACTERS.length; i++)
      if(CHARACTERS[i].id === id)
        return CHARACTERS[i];
    return {id: -1, name: '', currentLevel: -1, vision: '', affiliation: ''};
  }

  addCharacter(character: Character): number {
    if(CHARACTERS.length === 0)
      character.id = 1;
    else 
      character.id = Math.max.apply(Math, CHARACTERS.map(function(chara) { return chara.id; })) + 1;
    
    CHARACTERS.push(character);
    return character.id;
  }

  updateCharacter(character: Character): number {
    let index = CHARACTERS.findIndex(chara => chara.id === character.id);
    CHARACTERS[index] = character;
    return character.id;
  }

  deleteCharacter(character: Character): boolean {
    let index = CHARACTERS.findIndex(chara => chara.id == character.id);
    if (index < 0) {
      return false;
    }
    CHARACTERS.splice(index, 1);
    return true;
  }
}
