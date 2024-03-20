import { Component, Input } from '@angular/core';
import { Character } from '../character/character';
import { NgIf, Location, CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CharacterService } from '../services/character.service';
import { SaveService } from '../services/save.service';

@Component({
  standalone: true,
  selector: 'app-character-detail',
  templateUrl: './character-detail.component.html',
  styleUrl: './character-detail.component.scss',
  imports: [FormsModule, NgIf, CommonModule]
})
export class CharacterDetailComponent {
    chara: Character | undefined;
    title = "Character Detail";
    inputValue = "";

    constructor( private route: ActivatedRoute,
      private charaService: CharacterService,
      private location: Location) {}
    
    ngOnInit(): void {
      this.getCharacter();
    }

    getCharacter(): void {
      const id = Number(this.route.snapshot.paramMap.get('id'));
      this.chara = this.charaService.getCharacter(id);
    }

    goBack(): void {
      this.location.back();
    }

    saveGoBack(): void {
      if(this.chara){
        let charaID = this.charaService.updateCharacter(this.chara);
        SaveService.save(this.charaService);
        this.goBack();
      }
    }

    deleteGoBack(): void {
      if(this.chara){
        let charaID = this.charaService.deleteCharacter(this.chara);
        SaveService.save(this.charaService);
        this.goBack();
      }
    }
}
