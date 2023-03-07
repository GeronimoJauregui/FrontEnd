import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InfoService } from 'src/app/services/info.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(
    public _InfoService: InfoService,
    private router: Router) { }

  ngOnInit(): void {
  }

  buscarProducto(txtBuscar: string){
    if( txtBuscar.length > 0 ){
      this.router.navigate(['/search', txtBuscar]);
    }
  }
}
