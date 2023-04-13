import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Medico } from 'src/app/models/medico.model';
import { BusquedasService } from 'src/app/services/busquedas.service';
import { MedicoService } from 'src/app/services/medico.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: [
  ]
})
export class MedicosComponent implements OnInit, OnDestroy {
  public medicos: Medico[] = [];
  public medicosTemp: Medico[] = [];
  public cargando: boolean = true;
  public imgSubs: Subscription;
  constructor(private _medicoService: MedicoService,
              private _modalImagenService: ModalImagenService,
              private busquedasService: BusquedasService) { }
  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  ngOnInit(): void {
    this.cargarMedicos();

    this.imgSubs = this._modalImagenService.nuevaImagen
      .pipe(delay(100))
      .subscribe( img => this.cargarMedicos());
  }

  cargarMedicos() {
    this.cargando = true;
    this._medicoService.cargarMedico().subscribe( (medicos: Medico[]) => {
      this.medicos = medicos;
      this.medicosTemp = medicos;
      this.cargando = false;
    });
  }
  
  abrilModal(medico: Medico) {
    this._modalImagenService.abrirModal('medicos', medico._id, medico.img);
  }

  buscar(termino: string){
    if( termino.length === 0){
      this.medicos = this.medicosTemp;
    } else {
      this.busquedasService.buscar('medicos', termino).subscribe( (resp: any) => {
        this.medicos = resp;
      });
    }
  }

  borrarMedico(medico: Medico) {
    Swal.fire({
      title: 'Borrar mpedico?',
      text: `Esta a punto de borrar a ${medico.nombre}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirmar'
    }).then((result) => {
      if (result.isConfirmed) {
        this._medicoService.eliminarMedico(medico._id).subscribe( (resp: any) => {
          if( resp.ok){
            Swal.fire('Médico borrado', `${medico.nombre} fue eliminado correctamente`, 'success');
            this.cargarMedicos();
          } else {
            Swal.fire('Error', `Error al borrar al médico`, 'warning');
          }
        }, (err) => {
          Swal.fire('Error', err.error.msg, 'error');
        });
      }
    });
  }
}
