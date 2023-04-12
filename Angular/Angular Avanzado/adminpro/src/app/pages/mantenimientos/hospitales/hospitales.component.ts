import { Component, OnInit } from '@angular/core';
import { Hospital } from 'src/app/models/hospital.model';
import { HospitalService } from 'src/app/services/hospital.service';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: [
  ]
})
export class HospitalesComponent implements OnInit {
  public hospitales: Hospital[] = [];
  public cargando: boolean = true;

  constructor(private _hospitalService: HospitalService) { }

  ngOnInit(): void {
    this.cargarHospitales();
  }

  cargarHospitales(){
    this.cargando = true;
    this._hospitalService.cargarUsuarios().subscribe( (hospitales) => {
      this.hospitales = hospitales;
      this.cargando = false;
    })
  }

}
