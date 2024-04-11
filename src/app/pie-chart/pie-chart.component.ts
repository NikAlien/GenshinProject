import { Component } from '@angular/core';
import { CharacterService } from '../services/character.service';
import { BaseChartDirective } from 'ng2-charts';
import { ChartData } from 'chart.js';
import { Character } from '../character/character';

@Component({
  standalone: true,
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrl: './pie-chart.component.scss',
  imports: [BaseChartDirective]
})
export class PieChartComponent {
  title = 'Data Chart';
  filteredCharas: Character[] = [];


  pieChartData: ChartData<'pie', {key: string, value: number} []> = {
    labels: [
      'Anemo',
      'Cryo',
      'Dendro',
      'Electro',
      'Geo',
      'Hydro',
      'Pyro'
    ],
    datasets: [{
      type: 'pie',
      label: 'Vision',
      data: [],
      backgroundColor: ['#74C2A8', '#9FD6E3', '#A5C83B', '#AF8EC1', '#FAB632', '#4CC2F1', '#EF7938'],
    }]
  };

  constructor(private charaService : CharacterService) {}
  ngOnInit() : void {
    this.charaService.filterCharactersVision('anemo')
          .subscribe(characters => {this.filteredCharas = characters; 
            this.pieChartData.datasets[0].data.push(
            {key: 'Anemo', value: this.filteredCharas.length}
          );});
    this.charaService.filterCharactersVision('cryo')
          .subscribe(characters => {this.filteredCharas = characters;
            this.pieChartData.datasets[0].data.push(
              {key: 'Cryo', value: this.filteredCharas.length}
            );
          });
    
    this.charaService.filterCharactersVision('dendro')
          .subscribe(characters => {this.filteredCharas = characters;
            this.pieChartData.datasets[0].data.push(
              {key: 'Dendro', value: this.filteredCharas.length}
            );
          });
    
    this.charaService.filterCharactersVision('electro')
          .subscribe(characters => {this.filteredCharas = characters;
            this.pieChartData.datasets[0].data.push(
              {key: 'Electro', value: this.filteredCharas.length}
            );
          });
    
    this.charaService.filterCharactersVision('geo')
          .subscribe(characters => {this.filteredCharas = characters;
            this.pieChartData.datasets[0].data.push(
              {key: 'Geo', value: this.filteredCharas.length}
            );
          });
    
    this.charaService.filterCharactersVision('hydro')
          .subscribe(characters => {this.filteredCharas = characters;
            this.pieChartData.datasets[0].data.push(
              {key: 'Hydro', value: this.filteredCharas.length}
            );
          });
    
    this.charaService.filterCharactersVision('pyro')
          .subscribe(characters => {this.filteredCharas = characters;
            this.pieChartData.datasets[0].data.push(
              {key: 'Pyro', value: this.filteredCharas.length}
            );
          });
  }

}
