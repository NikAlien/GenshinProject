import { Injectable } from '@angular/core';
import { Character } from '../character/character';
import { Charas } from './mock-character';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CharacterService {

  constructor() { }

  getCharacters(): Observable<Character[]> {
    const charas = of(Charas)
    return charas;
  }

  getCharacter(id: number): Observable<Character>{
    const chara = Charas.find(c => c.id === id)!;
    return of(chara);
  }
}
