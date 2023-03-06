import { Component, OnInit } from '@angular/core';
import { InfoService } from 'src/app/services/info.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  constructor(public _InfoService: InfoService) { }
  anio: number = new Date().getFullYear();
  ngOnInit(): void {
  }

}
