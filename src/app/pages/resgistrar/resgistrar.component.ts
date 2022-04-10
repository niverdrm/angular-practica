import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EmpleadoServiceService } from 'src/app/service/empleado-service.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-resgistrar',
  templateUrl: './resgistrar.component.html',
  styleUrls: ['./resgistrar.component.css'],
})
export class ResgistrarComponent implements OnInit {
  formEmpleado: FormGroup;
  public titulo: string = 'Registrar';
  empleado: any = null;

  constructor(
    private empleadoService: EmpleadoServiceService,
    private router: Router
  ) {
    this.formEmpleado = this.createFormEmpleado();
    this.cargarEmpleado();
  }
  createFormEmpleado(): FormGroup {
    return new FormGroup({
      primerNombre: new FormControl('', Validators.required),
      primerApellido: new FormControl('', Validators.required),
      pais: new FormControl('', [Validators.required, Validators.email]),
      cedula: new FormControl('', Validators.required),
    });
  }
  ngOnInit(): void {}

  async cargarEmpleado() {
    this.titulo = this.empleadoService.titulo || 'Registrar';
    if (this.empleadoService.empleado) {
      const { primerNombre, primerApellido, pais, cedula } =
        this.empleadoService.empleado;
      this.formEmpleado.setValue({
        primerNombre,
        primerApellido,
        pais,
        cedula,
      });
      this.empleado = this.formEmpleado;
    }
  }

  validarEditarCrear() {
    this.titulo === 'Editar' ? this.editarEmpleado() : this.registrarEmpleado();
    this.empleadoService.titulo = 'Registrar';
    this.titulo = this.empleadoService.titulo;
  }

  async registrarEmpleado() {
    const resp: any = await this.empleadoService.registrarEmpleado(
      this.formEmpleado.value
    );
    resp.ok
      ? Swal.fire(resp.msg, '', 'success')
      : Swal.fire(resp.msg, '', 'error');
    this.router.navigateByUrl('listar');
  }
  async editarEmpleado() {
    const resp: any = await this.empleadoService.editarEmpleado(
      this.empleadoService.empleado.id,
      this.formEmpleado.value
    );
    this.titulo = 'Registrar';
    resp.ok
      ? Swal.fire(resp.msg, '', 'success')
      : Swal.fire(resp.msg, '', 'error');

    this.router.navigateByUrl('listar');
  }

  get primerNombres() {
    return this.formEmpleado.get('nombres');
  }
  get primerApellidos() {
    return this.formEmpleado.get('apellidos');
  }

  get pais() {
    return this.formEmpleado.get('correo');
  }

  get cedula() {
    return this.formEmpleado.get('celular');
  }
}
