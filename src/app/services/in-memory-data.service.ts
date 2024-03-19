import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Character } from '../character/character';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService{
    createDb(){
      const characters = [
        {id: 11, name: 'Razor', currentLevel: 90, vision: 'electro'},
        {id: 12, name: 'Bennett', currentLevel: 90, vision: 'pyro'},
        {id: 13, name: 'Kaeya', currentLevel: 90, vision: 'cryo'},
        {id: 14, name: 'Xianyun', currentLevel: 80, vision: 'anemo'},
        {id: 15, name: 'Cyno', currentLevel: 90, vision: 'electro'},
        {id: 16, name: 'Tighnari', currentLevel: 90, vision: 'dendro'},
        {id: 17, name: 'Baizhu', currentLevel: 87, vision: 'dendro'},
        {id: 18, name: 'Xingqiu', currentLevel: 90, vision: 'hydro'},
    ];
    return {characters};
    }

    genId(characters: Character[]) : number {
      return characters.length > 0 ? Math.max(...characters.map(chara => chara.id)) + 1 : 11;
    }
}
