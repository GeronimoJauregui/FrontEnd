import { Component } from '@angular/core';
import { ChartType } from 'chart.js';
import { MultiDataSet, Label, Color } from 'ng2-charts';

@Component({
  selector: 'app-grafica1',
  templateUrl: './grafica1.component.html',
  styles: [
  ]
})
export class Grafica1Component {

  titleSales: string = "Sales";
  arrayLabelsSales: string[] = [ 'Download Sales', 'In-Store Sales', 'Mail-Order Sales' ];
  dataSales = [
    [ 350, 450, 100 ]
  ];
  colorsSales = [ { backgroundColor: [ '#9E120E', '#FF5800', '#ffB414'] } ];

  titlePedidos: string = "Pedidos";
  arrayLabelsPedidos: string[] = [ 'Sopa', 'Desodorante', 'Cepillo de dientes' ];
  dataPedidos = [
    [ 10, 20, 30 ]
  ];
  colorsPedidos = [ { backgroundColor: [ '#236E23', '#23336E', '#6E236E'] } ];
}
