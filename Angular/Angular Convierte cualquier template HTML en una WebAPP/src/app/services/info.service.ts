import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { InfoPagina } from '../interfaces/info_pagina.interface';

@Injectable({
  providedIn: 'root'
})
export class InfoService {
  data_info: InfoPagina = {};
  data_cargada = false;
  data_equipo: any;
  constructor(private http: HttpClient) { 
    this.obtenerInfo();
    this.obtenerEquipo();
  }

  private obtenerInfo (){
    this.http.get('assets/data/data.json').subscribe( (resp: InfoPagina) => {
      this.data_info = resp;
      this.data_cargada = true;
    });
  }

  private obtenerEquipo (){
    this.http.get('https://angular-webapp-15962-default-rtdb.firebaseio.com/equipo.json').subscribe( (resp: any) => {
      this.data_equipo = resp;
    });
  }
}
