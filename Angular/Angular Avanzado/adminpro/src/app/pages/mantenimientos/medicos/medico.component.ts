import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { delay } from 'rxjs/operators';
import { Hospital } from 'src/app/models/hospital.model';
import { Medico } from 'src/app/models/medico.model';
import { HospitalService } from 'src/app/services/hospital.service';
import { MedicoService } from 'src/app/services/medico.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: [
  ]
})
export class MedicoComponent implements OnInit {
  public medicoForm: FormGroup;
  public hospitales: Hospital[] = [];
  public hospitalSeleccionado: Hospital;
  public medicoSeleccionado: Medico;
  constructor( private fb: FormBuilder,
              private _medicoService: MedicoService,
              private _hospitalService: HospitalService,
              private _router: Router,
              private _activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this._activatedRoute.params.subscribe( ({ id }) => {
      this.cargarMedico(id);
    });
    this.medicoForm = this.fb.group({
      nombre: ['Geronimo', Validators.required],
      hospital: ['', Validators.required],
    });
    this.cargarHospitales();
    this.medicoForm.get('hospital').valueChanges.subscribe( hospitalId => {
      this.hospitalSeleccionado = this.hospitales.find( h => h._id === hospitalId );
    });

  }

  cargarHospitales() {
    this._hospitalService.cargarHospital().subscribe( (hospitales) => {
      this.hospitales = hospitales;
    })
  }

  cargarMedico(id: string) {
    this._medicoService.obtenerMedico(id)
    .pipe( delay(100))
    .subscribe( (medico) => {
      this.medicoSeleccionado = medico;
      const { nombre, hospital: { _id } } = medico;
      this.medicoForm.setValue({ nombre, hospital: _id });
    })
  }

  guardarMedico() {
    if(this.medicoSeleccionado){
      this._medicoService.actualizarMedico( this.medicoSeleccionado._id, this.medicoForm.value).subscribe( (resp: any) => {
        if(resp.ok){
          Swal.fire('Actualizado', 'Se actualizo correctamente al médico', 'success');
          this._router.navigateByUrl(`/dashboard/medicos`);
        }
      });
    } else {
      this._medicoService.crearMedico(this.medicoForm.value).subscribe( (resp: any) => {
        if(resp.ok){
          Swal.fire('Guardado', 'Se creo correctamente al médico', 'success');
          this._router.navigateByUrl(`/dashboard/medicos`);
        }
      });
    }
  }
}
