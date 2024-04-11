import { Injectable } from '@angular/core';
import { CHARACTERS } from './mock-character';
import { Character } from '../character/character';
import { Observable, of } from 'rxjs';
import { Savable } from './savable';
import { SaveService } from './save.service';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CharacterService implements Savable{

  apiUrl = 'http://localhost:8080/api/v1/characters';

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
  constructor(private http: HttpClient) { 
    SaveService.load(this);
  }

  getCharacters(page: number, elements: number): Observable<Character[]> {
    const charas = this.http.get<Character[]>(this.apiUrl+'/page_'+ page, {
      params: new HttpParams()
      .set('number', elements)
    });
    return charas;
  }

  sortByLevel(page: number, elements: number): Observable<Character[]> {
    const charas = this.http.get<Character[]>(this.apiUrl+'/page/sorted/byLevel_'+ page, {
      params: new HttpParams()
      .set('number', elements)
    });
    return charas;
  }

  sortByName(page: number, elements : number): Observable<Character[]> {
    const charas = this.http.get<Character[]>(this.apiUrl+'/page/sorted/byName_'+ page, {
      params: new HttpParams()
      .set('number', elements)
    });
    return charas;
  }

  size() : Observable<number> {
    return this.http.get<number>(this.apiUrl + '/size');
  }

  private paginate(who: any, page: number, elements: number) {
    let start = elements * (page - 1);
    if (start < 0) start = 0;
    return who.slice(start, elements * page);
  }

  filterCharactersVision(vision: string): Observable<Character[]> {
    const charas = this.http.get<Character[]>(this.apiUrl+'/filtered/byVision/'+ vision);
    return charas;
  }

  getCharacter(id: number): Observable<Character>{
    return this.http.get<Character>(this.apiUrl + '/id_' + id);
  }

  addCharacter(character: Character): Observable<number> {
    return this.http.post<number>(this.apiUrl + '/insert', character);
  }

  updateCharacter(character: Character): Observable<number> {
    return this.http.put<number>(this.apiUrl + '/update_' + character.id, character);
  }

  deleteCharacter(id: number): Observable<boolean> {
    return this.http.delete<boolean>(this.apiUrl + '/delete_' + id);
  }
}
