import { Component } from '@angular/core';
import { CharacterService } from '../services/character.service';
import { Character } from '../character/character';
import { BaseChartDirective } from 'ng2-charts';
import { ChartData } from 'chart.js';

@Component({
  standalone: true,
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrl: './pie-chart.component.scss',
  imports: [BaseChartDirective]
})
export class PieChartComponent {
  title = 'Chart of Data';


  pieChartData: ChartData<'pie', {key: string, value: number} []> = {
    datasets: [{
      type: 'pie',
      label: 'Visions',
      data: []
    }],
    labels: [
      'Anemo',
      'Cryo',
      'Dendro',
      'Electro',
      'Geo',
      'Hydro',
      'Pyro'
    ]
  };

  constructor(private charaService : CharacterService) {}
  ngOnInit() : void {

    this.pieChartData.datasets[0].data.push(
      {key: 'Anemo', value: this.charaService.filterCharactersVision('anemo').length}
    );
    this.pieChartData.datasets[0].data.push(
      {key: 'Cryo', value: this.charaService.filterCharactersVision('cryo').length}
    );
    this.pieChartData.datasets[0].data.push(
      {key: 'Dendro', value: this.charaService.filterCharactersVision('dendro').length}
    );
    this.pieChartData.datasets[0].data.push(
      {key: 'Electro', value: this.charaService.filterCharactersVision('electro').length}
    );
    this.pieChartData.datasets[0].data.push(
      {key: 'Geo', value: this.charaService.filterCharactersVision('geo').length}
    );
    this.pieChartData.datasets[0].data.push(
      {key: 'Hydro', value: this.charaService.filterCharactersVision('hydro').length}
    );
    this.pieChartData.datasets[0].data.push(
      {key: 'Pyro', value: this.charaService.filterCharactersVision('pyro').length}
    );
  }


}
