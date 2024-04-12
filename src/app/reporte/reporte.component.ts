import { Component, OnInit } from '@angular/core';
import { RegistrosService } from '../servicios/registros.service';
import { Appcontraloria } from '../interfaz/appcontraloria';
import { ImprimirService } from '../servicios/imprimir.service';

@Component({
  selector: 'app-reporte',
  templateUrl: './reporte.component.html',
  styleUrl: './reporte.component.scss'
})
export class ReporteComponent implements OnInit {

  asignacion: boolean = false;
  mantenimiento: boolean = false;
  entrada: boolean = false;
  registros: boolean = false;
  todo: boolean = false;

  appcontraloria: Appcontraloria[] = [];
  registroasignar = 0;

  appcontraloriaman: Appcontraloria[] = [];
  registromatenimiento = 0;

  appcontraloriare: Appcontraloria[] = [];
  registroregistro = 0;
  registrousu = 0;

  appcontraloriaent: Appcontraloria[] = [];
  ultimaCarga: Date | [] = [];
  registrosent = 0;
  registroactu = 0;

  constructor(private registrosService: RegistrosService,
    private imprimir: ImprimirService
  ) { }

  toggleasignacion(event: any) {
    this.asignacion = event.checked;
  }
  togglematenimiento(event: any) {
    this.mantenimiento = event.checked;
  }
  toggleentrada(event: any) {
    this.entrada = event.checked;
  }
  toggleregistros(event: any) {
    this.registros = event.checked;
  }
  toggletodo(event: any) {
    this.todo = event.checked;
  }
  ngOnInit(): void {
    //asignacion
    this.registrosService.getPlaces().subscribe(appcontraloria => {
      this.appcontraloria = appcontraloria.filter(asig => asig.usuario && asig.cedula && asig.Departamento);

      this.registroasignar = this.appcontraloria.length;
    });

    //matenimiento
    this.registrosService.getPlaces().subscribe(appcontraloriaman => {
      this.appcontraloriaman = appcontraloriaman.filter(item => item.tipo_de_mantenimiento && item.mantenimiento && item.defragmentacion);

      this.registromatenimiento = this.appcontraloriaman.length;
    });
    //Entrada
    this.registrosService.getPlaces().subscribe(appcontraloriaent => {
      if (!this.ultimaCarga) {
        this.ultimaCarga = new Date();
        this.ultimaCarga.setDate(this.ultimaCarga.getDate() - 30);
      }
      this.appcontraloriaent = appcontraloriaent.filter(item => {
        if (this.ultimaCarga) {
          const fechaEntrada = new Date(item.fecha_de_entrada);

          if (fechaEntrada > this.ultimaCarga) {
            this.registrosent++;
            return true;
          }
        }
        return false;
      });
      console.log('Registros nuevos:', this.registrosent);
      console.log('Registros actualizados:', this.registroactu);
      this.ultimaCarga = new Date();
    });

    //Registro
    this.registrosService.getPlaces().subscribe(appcontraloriare => {
      const unaSemanaAtras = new Date();
      unaSemanaAtras.setDate(unaSemanaAtras.getDate() - 30);
      this.appcontraloriare = appcontraloriare.filter(registro => {
        const fechaActualizacion = new Date(registro.fecha_de_actualizacion);
        const fechaEliminacion = new Date(registro.fecha_de_elimusuario);
        if (fechaActualizacion > unaSemanaAtras) {
          this.registroregistro++;
          return true;
        }
        if (fechaEliminacion > unaSemanaAtras) {
          this.registrousu++;
          return true;
        }
        return false;
      });
    });
  }

  //Registro
  onImprimirRegistros() {
    const encabezado = ["Dispositivo", "Modelo", "Serial", "Placa", "Bienes Nacionales", "Usuario", "Departamento", "Matenimiento"];
    const cuerpo = this.appcontraloriare.map(registro => {
      return [
        registro.dispositivo,
        registro.modelo,
        registro.serial,
        registro.placa,
        registro.bienes_nacionales,
        registro.usuario,
        registro.Departamento,
        registro.mantenimiento
      ];
    });

    this.imprimir.imprimir(encabezado, cuerpo, "Reporte de los cambios de Registros", true);
  }

  //Entrada
onImprimirEntrada(){
  const encabezado = ["Dispositivo", "Modelo", "Serial", "Placa", "Bienes Nacionales", "Fecha de entrada", "Fecha de actualizado"];
  const cuerpo = this.appcontraloriaent.map(item => {
    return [
      item.dispositivo,
      item.modelo,
      item.serial,
      item.placa,
      item.bienes_nacionales,
      item.fecha_de_entrada,
      item.fecha_de_actualizacion
    ];
  });
  this.imprimir.imprimir(encabezado, cuerpo, "Reporte de los cambios de las entradas", true);
}

  //Asignacion
  onImprimirAsignacion(){
    const encabezado = ["Dispositivo", "Serial", "Cedula", "Usuario", "Departamento", "OS", "CPU","Memoria", "Almacenamiento"];
    const cuerpo = this.appcontraloriaent
      .filter(asig => asig.usuario && asig.cedula && asig.Departamento) 
      .map(asig => {
        return [
          asig.dispositivo,
          asig.serial,
          asig.cedula,
          asig.usuario,      
          asig.Departamento,
          asig.os,
          asig.cpu,
          asig.memoria,
          asig.almacenamiento
        ];
      });
    this.imprimir.imprimir(encabezado, cuerpo, "Reporte de los cambios de los dipositivos asignados", true);
  }  

  //Mantenimiento
onImprimirManteni(){
  const encabezado = ["Dispositivo", "Serial", "Placa", "Tipo de mantenimiento","Descripcion","Fisico y Logico", "Defragmentacion", "Fecha de mantenimiento"];
  const cuerpo = this.appcontraloriaman
  .filter(item => item.tipo_de_mantenimiento && item.mantenimiento && item.defragmentacion)
  .map(item => {
    return [
      item.dispositivo,
      item.serial,
      item.placa,
      item.tipo_de_mantenimiento,
      item.mantenimiento,
      item.memoria +''+ item.almacenamiento +''+ item.limpieza +''+ item.os,
      item.defragmentacion,
      item.fecha_de_mantenimiento
    ];
  });
  this.imprimir.imprimir(encabezado, cuerpo, "Reporte de los cambios de mantenimiento", true);
}

onImprimirTodos() {
  //registro
  const encabezado1 =[ "Dispositivo", "Modelo", "Serial", "Placa", "Bienes Nacionales", "Usuario", "Departamento", "Mantenimiento"];
  const cuerpo1 = this.appcontraloriare.map(registro => {
    return [
      registro.dispositivo,
      registro.modelo,
      registro.serial,
      registro.placa,
      registro.bienes_nacionales,
      registro.usuario,
      registro.Departamento,
      registro.mantenimiento
    ];
  });
 
  //entrada
  const encabezado2 =[ "Dispositivo", "Modelo", "Serial", "Placa", "Bienes Nacionales", "Fecha de entrada", "Fecha de actualización"];
  const cuerpo2 = this.appcontraloriaent.map(item => {
    return [
      item.dispositivo,
      item.modelo,
      item.serial,
      item.placa,
      item.bienes_nacionales,
      item.fecha_de_entrada,
      item.fecha_de_actualizacion
    ];
  });

  //asignar
  const encabezado3 = ["Dispositivo", "Serial", "Cedula", "Usuario", "Departamento", "OS", "CPU","Memoria", "Almacenamiento"];
  const cuerpo3 = this.appcontraloriaent
    .filter(asig => asig.usuario && asig.cedula && asig.Departamento) 
    .map(asig => {
      return [
        asig.dispositivo,
        asig.serial,
        asig.cedula,
        asig.usuario,      
        asig.Departamento,
        asig.os,
        asig.cpu,
        asig.memoria,
        asig.almacenamiento
      ];
    });
    //matenimiento
  const encabezado4 =[ "Dispositivo", "Serial", "Placa", "Tipo de mantenimiento","Descripcion","Fisico y Logico", "Defragmentacion", "Fecha de mantenimiento"];
  const cuerpo4 = this.appcontraloriaman
    .filter(item => item.tipo_de_mantenimiento && item.mantenimiento && item.defragmentacion)
    .map(item => {
      return [
        item.dispositivo,
        item.serial,
        item.placa,
        item.tipo_de_mantenimiento,
        item.mantenimiento,
        item.memoria +''+ item.almacenamiento +''+ item.limpieza +''+ item.os,
        item.defragmentacion,
        item.fecha_de_mantenimiento
      ];
    });

    const encabezados = [encabezado1, encabezado2, encabezado3, encabezado4];
    const cuerpos = [cuerpo1, cuerpo2, cuerpo3, cuerpo4];
  
    this.imprimir.imprimirTodas(encabezados, cuerpos, ["Reporte de los cambios de Registros", "Reporte de los cambios de las entradas", "Reporte de los cambios de los dispositivos asignados", "Reporte de los cambios de mantenimiento"], true);
}
}