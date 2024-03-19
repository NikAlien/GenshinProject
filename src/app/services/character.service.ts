import { Injectable } from '@angular/core';
import { Character } from '../character/character';
import { Charas } from './mock-character';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CharacterService {
  private charasUrl = 'api/characters'

  constructor(private http: HttpClient) { }

  getCharacters(): Observable<Character[]> {
    return this.http.get<Character[]>(this.charasUrl)
    .pipe(
      catchError(this.handleError<Character[]>('getCharacters', []))
    );
  }

  getCharacter(id: number): Observable<Character>{
    const url = `${this.charasUrl}/${id}`;
    return this.http.get<Character>(url).pipe(
      catchError(this.handleError<Character>('getCharacter id = ${id}'))
    );
  }

  private handleError<T>(operation = 'operation', result?: T){
    return (error: any) : Observable<T> =>{
      console.error(error);
      // need message service here to print on console
      return of(result as T);
    };
  }
}
