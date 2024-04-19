import { Injectable } from '@angular/core';
import { Character } from '../character/character';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Stomp, CompatClient } from '@stomp/stompjs';

@Injectable({
  providedIn: 'root'
})
export class CharacterService {

  apiUrl = 'http://localhost:8080/api/v1/characters';

  constructor(private http: HttpClient) { 
    // this.initUpdateSocket();
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
    console.log('got character ' + id);
    return this.http.get<Character>(this.apiUrl + '/id_' + id);
  }

  addCharacter(character: Character): Observable<number> {
    return this.http.post<number>(this.apiUrl + '/insert', character);
  }

  updateCharacter(character: Character): Observable<number> {
    return this.http.put<number>(this.apiUrl + '/update_' + character.characterId, character);
  }

  deleteCharacter(id: number): Observable<boolean> {
    return this.http.delete<boolean>(this.apiUrl + '/delete_' + id);
  }



  //      WebSocket update

  // private stompClient: CompatClient = Stomp.client("ws://localhost:8080/messages");
  // private callableMap: Map<any, Function> = new Map<any, Function>();
  // private sizeLastUpdate: number = 8;

  // private makeUpdateSocket() {
    
  //   this.stompClient.onConnect = () => {
  //       this.stompClient.subscribe('/article', (result) => {
  //         if (this.sizeLastUpdate < JSON.parse(result.body)) {
  //           this.callableMap.forEach((value, key) => { value.call(key); })
  //         }
  //       });
  //   };
    
  //   this.stompClient.onWebSocketError = (error) => {
  //       console.error('Error with update websocket', error);
  //   };
    
  //   this.stompClient.onStompError = (frame) => {
  //       console.error('Broker reported error: ' + frame.headers['message']);
  //       console.error('Additional details: ' + frame.body);
  //   };

  //   this.stompClient.activate();
  // }
  
  // private requestUpdateSocket() {
  //   if (this.stompClient == null) return;
  //   this.stompClient.publish({
  //     destination: "/app/article-time",
  //     body: "{}"
  //   });
  // }

  // private initUpdateSocket() {
  //   this.makeUpdateSocket();
  // }

  // subscribeToSocket(self: any, callable: Function) {
  //   this.callableMap.set(self, callable);
  // }
}
