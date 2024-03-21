import { TestBed } from '@angular/core/testing';
import { CharacterService } from './character.service';
import { CHARACTERS } from './mock-character';

describe('CharacterService', () => {
  let service: CharacterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CharacterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add new element', () => {
    service.addCharacter({id: 10, name: 'Razor', currentLevel: 90, vision: 'electro', affiliation: 'Wolvendom'});
    expect(CHARACTERS.length).toEqual(9);
    service.addCharacter({id: 11, name: 'Razor', currentLevel: 90, vision: 'electro', affiliation: 'Wolvendom'});
    expect(CHARACTERS.length).toEqual(10);
  });

  it('should delete new element', () => {
    service.deleteCharacter({id: 5, name: 'Cyno', currentLevel: 90, vision: 'electro', affiliation: 'Temple of Silence'})
    expect(CHARACTERS.length).toEqual(9);
  });

  it('should update new element', () => {
    service.updateCharacter({id: 1, name: 'Real', currentLevel: 70, vision: 'anemo', affiliation: 'Wolvendom'})
    expect(CHARACTERS[0].name).toEqual('Real');
    expect(CHARACTERS[0].currentLevel).toEqual(70);
    expect(CHARACTERS[0].vision).toEqual('anemo');
  });
});
