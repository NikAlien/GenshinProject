import { Component } from '@angular/core';
import { CharacterService } from '../services/character.service';
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
  title = 'Data Chart';


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

  // barChartData: ChartData<'bar', {key: string, value: number} []> = {
  //   labels: [
  //     'Anemo',
  //     'Cryo',
  //     'Dendro',
  //     'Electro',
  //     'Geo',
  //     'Hydro',
  //     'Pyro'
  //   ],
  //   datasets: [{
  //     type: 'bar',
  //     label: 'Vision',
  //     data: [],
  //     backgroundColor: ['#74C2A8', '#9FD6E3', '#A5C83B', '#AF8EC1', '#FAB632', '#4CC2F1', '#EF7938'],
  //     parsing: {
  //       xAxisKey: 'key',
  //       yAxisKey: 'value'
  //     }
  //   }]
  // };

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

    // this.barChartData.datasets[0].data.push(
    //   {key: 'Anemo', value: this.charaService.filterCharactersVision('anemo').length}
    // );
    // this.barChartData.datasets[0].data.push(
    //   {key: 'Cryo', value: this.charaService.filterCharactersVision('cryo').length}
    // );
    // this.barChartData.datasets[0].data.push(
    //   {key: 'Dendro', value: this.charaService.filterCharactersVision('dendro').length}
    // );
  }


}
