import { Component } from '@angular/core';
import { CharacterService } from '../services/character.service';
import { BaseChartDirective } from 'ng2-charts';
import { ChartData } from 'chart.js';
import { Character } from '../character/character';
import { repeat } from 'rxjs';
import { NgIf } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrl: './pie-chart.component.scss',
  imports: [BaseChartDirective, NgIf]
})
export class PieChartComponent {
  title = 'Data Chart';
  filteredCharas: Character[] = [];
  totalChara : number = 1;
  chartTick: boolean = true;


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
  ngOnInit(): void {
    this.putInChartData();
  }

  putInChartData() : void {
    this.charaService.getPieChartData()
    .pipe(repeat({delay : 6000}))
      .subscribe(data => {
        if(this.pieChartData.datasets[0].data.length == 0) {
          this.pieChartData.datasets[0].data.push({key: 'Anemo', value: data[0]});
          this.pieChartData.datasets[0].data.push({key: 'Cryo', value: data[1]});
          this.pieChartData.datasets[0].data.push({key: 'Dendro', value: data[2]});
          this.pieChartData.datasets[0].data.push({key: 'Electro', value: data[3]});
          this.pieChartData.datasets[0].data.push({key: 'Geo', value: data[4]});
          this.pieChartData.datasets[0].data.push({key: 'Hydro', value: data[5]});
          this.pieChartData.datasets[0].data.push({key: 'Pyro', value: data[6]});
        }
        else {
          this.pieChartData.datasets[0].data.find((item) => item.key == 'Anemo')!.value = data[0];
          this.pieChartData.datasets[0].data.find((item) => item.key == 'Cryo')!.value = data[1];
          this.pieChartData.datasets[0].data.find((item) => item.key == 'Dendro')!.value = data[2];
          this.pieChartData.datasets[0].data.find((item) => item.key == 'Electro')!.value = data[3];
          this.pieChartData.datasets[0].data.find((item) => item.key == 'Geo')!.value = data[4];
          this.pieChartData.datasets[0].data.find((item) => item.key == 'Hydro')!.value = data[5];
          this.pieChartData.datasets[0].data.find((item) => item.key == 'Pyro')!.value = data[6];
        }
        console.log('got chart data...')

        let prevState = this.chartTick;
        this.chartTick = false;
        setTimeout(() => this.chartTick = prevState, 1);
      })
  }
}
