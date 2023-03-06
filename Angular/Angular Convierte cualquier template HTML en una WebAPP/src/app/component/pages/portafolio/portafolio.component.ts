import { Component, OnInit } from '@angular/core';
import { InfoService } from 'src/app/services/info.service';

@Component({
  selector: 'app-portafolio',
  templateUrl: './portafolio.component.html',
  styleUrls: ['./portafolio.component.scss']
})
export class PortafolioComponent implements OnInit {

  constructor(public _InfoService: InfoService) { }

  ngOnInit(): void {
  }

}
