import { Component } from '@angular/core';
import { Character } from '../character/character';
import { NgIf, CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CharacterService } from '../services/character.service';
import { SaveService } from '../services/save.service';
import { CharacterValidation } from '../character/character';

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
    errorMessage = "";
    

    constructor( private route: ActivatedRoute,
      private charaService: CharacterService) {}
    
    ngOnInit(): void {
      this.getCharacter();
    }

    getCharacter(): void {
      const id = Number(this.route.snapshot.paramMap.get('id'));
      this.charaService.getCharacter(id).subscribe(chara => this.chara = chara);
    }

    goBack(): void {
      window.location.replace('/characterList');
    }

    getErrorMessage(): string {
      return this.errorMessage;
    }

    saveGoBack(): void {
      if(this.chara){
        this.errorMessage = CharacterValidation.validate(this.chara);
        if(this.errorMessage.trim().length <= 0){
          this.charaService.updateCharacter(this.chara)
          .subscribe(id => {
            this.goBack();
          });
        }
      }
    }

    deleteGoBack(): void {
      if(this.chara){
        this.charaService.deleteCharacter(this.chara.id)
        .subscribe(bool => {
          this.goBack();
        });
      }
    }
}
