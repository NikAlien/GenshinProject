import { Component, Input } from '@angular/core';
import { Character } from '../character/character';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-character-detail',
  templateUrl: './character-detail.component.html',
  styleUrl: './character-detail.component.scss',
  imports: [FormsModule, NgIf]
})
export class CharacterDetailComponent {
    @Input() chara?: Character;
    title = "Character Detail";
}
