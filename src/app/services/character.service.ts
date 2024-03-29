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

  getCharacters(page: number): Observable<Character[]> {
    const charas = of(this.paginate(CHARACTERS, page, 2))
    return charas;
  }

  sortByLevel(page: number): Observable<Character[]> {
    const charas = of(this.paginate(CHARACTERS.toSorted((a, b) => b.currentLevel - a.currentLevel), page, 2))
    return charas;
  }

  sortByName(page: number): Observable<Character[]> {
    const charas = of(this.paginate(CHARACTERS.toSorted((a, b) => a.name > b.name? 1 : -1), page, 2))
    return charas;
  }

  size() : number {
    return CHARACTERS.length;
  }

  private paginate(who: any, page: number, elements: number) {
    let start = elements * (page - 1);
    if (start < 0) start = 0;
    return who.slice(start, elements * page);
  }

  filterCharactersVision(vision: string): Character[] {
    const charas = CHARACTERS.filter((chara) => chara.vision === vision)
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
