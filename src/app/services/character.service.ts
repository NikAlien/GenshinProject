import { Injectable } from '@angular/core';
import { Character } from '../character/character';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CharacterService {

  apiUrl = 'http://localhost:8080/api/v1/characters';

  constructor(private http: HttpClient) { 
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

  filterCharactersVision(vision: string): Observable<Character[]> {
    const charas = this.http.get<Character[]>(this.apiUrl + '/filtered/byVision/' + vision);
    return charas;
  }

  getPieChartData(): Observable<number[]> {
    return this.http.get<number[]>(this.apiUrl + '/chartData');
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
