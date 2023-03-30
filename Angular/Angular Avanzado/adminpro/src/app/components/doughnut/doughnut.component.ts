import { Component, Input } from '@angular/core';
import { Color, Label, MultiDataSet } from 'ng2-charts';

@Component({
  selector: 'app-doughnut',
  templateUrl: './doughnut.component.html',
  styles: [
  ]
})
export class DoughnutComponent {

  sinNombre: string = "Sin nombre";
  sinLabels: string[] = [ 'Sin label' ];
  sinData = [[ 100 ]];
  sinColors = [{backgroundColor: ['#9E120E']}];
  
  @Input("title") title = this.sinNombre;
  @Input("labels") doughnutChartLabels: Label[] = this.sinLabels;
  @Input("dataGraf") doughnutChartData: MultiDataSet = this.sinData;
  @Input("colors") colors: Color[] = this.sinColors;

}
