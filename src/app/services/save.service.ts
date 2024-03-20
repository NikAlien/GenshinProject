import { Injectable } from '@angular/core';
import { Savable } from './savable';

@Injectable({
  providedIn: 'root'
})
export class SaveService {

  constructor() { }

  static save(entity: Savable) {
    entity.saveData();
  }

  static load(entity: Savable) {
    entity.loadData();
  }
}
