import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Hospital } from 'src/app/models/hospital.model';
import { BusquedasService } from 'src/app/services/busquedas.service';
import { HospitalService } from 'src/app/services/hospital.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: [
  ]
})
export class HospitalesComponent implements OnInit {
  public hospitales: Hospital[] = [];
  public hospitalesTemp: Hospital[] = [];
  public cargando: boolean = true;
  public imgSubs: Subscription;
  constructor(private _hospitalService: HospitalService,
              private _modalImagenService: ModalImagenService,
              private busquedasService: BusquedasService) { }

  ngOnInit(): void {
    this.cargarHospitales();

    this.imgSubs = this._modalImagenService.nuevaImagen
      .pipe(delay(100))
      .subscribe( img => this.cargarHospitales());
  }

  cargarHospitales() {
    this.cargando = true;
    this._hospitalService.cargarHospital().subscribe( (hospitales) => {
      this.hospitales = hospitales;
      this.hospitalesTemp = hospitales;
      this.cargando = false;
    })
  }

  actualizarHospital(hospital: Hospital) {
    this._hospitalService.actualizarHospital(hospital._id, hospital.nombre).subscribe( (resp: any) => {
      Swal.fire('Actualizado', hospital.nombre, 'success');
      this.cargarHospitales();
    });
  }

  eliminarHospital(hospital: Hospital) {
    Swal.fire({
      title: 'Borrar usuario?',
      text: `Esta a punto de borrar a ${hospital.nombre}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirmar'
    }).then((result) => {
      if (result.isConfirmed) {
        this._hospitalService.eliminarHospital(hospital._id).subscribe( (resp: any) => {
          if( resp.ok){
            Swal.fire('Hospital borrado', `${hospital.nombre} fue eliminado correctamente`, 'success');
            this.cargarHospitales();
          } else {
            Swal.fire('Error', `Error al borrar al hospital`, 'warning');
          }
        }, (err) => {
          Swal.fire('Error', err.error.msg, 'error');
        });
      }
    });
  }

  async abrirSweetAlert() {
    const { value = '' } = await Swal.fire<string>({
      title: 'Crear hospital',
      text: 'Ingrese el nombre del nuevo hospital',
      input: 'text',
      inputPlaceholder: 'Nombre del hospital',
      showCancelButton: true,
    });
    if( value.trim().length > 0 ) {
      this._hospitalService.crearHospital(value).subscribe( (resp: any) => {
        Swal.fire('Exitoso', 'Hospital creado correctamente', 'success');
        this.cargarHospitales();
      });
    }
  }

  abrilModal(hospital: Hospital) {
    this._modalImagenService.abrirModal('hospitales', hospital._id, hospital.img);
  }

  buscar(termino: string){
    if( termino.length === 0){
      this.hospitales = this.hospitalesTemp;
    } else {
      this.busquedasService.buscar('hospitales', termino).subscribe( (resp: any) => {
        this.hospitales = resp;
      });
    }
  }
}
