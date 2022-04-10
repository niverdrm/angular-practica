import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmpleadoServiceService } from 'src/app/service/empleado-service.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.css'],
})
export class ListarComponent implements OnInit {
  empleados: any[] = [];

  constructor(
    private empleadoService: EmpleadoServiceService,
    private router: Router
  ) {
    this.listarEmpleados();
  }

  ngOnInit(): void {}

  async listarEmpleados() {
    const resp: any = await this.empleadoService.listarEmpleados();
    this.empleados = resp.data;
    // resp.ok
    //   ? Swal.fire(resp.msg, '', 'success')
    //   : Swal.fire(resp.msg, '', 'error');
  }
  async eliminarEmpleado(id: number) {
    console.log(id);
    const resp: any = await this.empleadoService.eliminarEmpleados(id);
    if (resp.ok) {
      Swal.fire(resp.msg, '', 'success');
      this.empleados = this.empleados.filter(
        (empleado: any) => empleado.id !== id
      );
    } else {
      Swal.fire('No pudo ser Eliminado', '', 'error');
    }
  }

  emitirEmpleado(empleado: any) {
    this.router.navigateByUrl('home');
    this.empleadoService.titulo = 'Editar';
    this.empleadoService.empleado = empleado;
  }
}
