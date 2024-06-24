import { Component, OnInit } from '@angular/core';
import { RegistrosService } from '../servicios/registros.service';
import { Appcontraloria } from '../interfaz/appcontraloria';
import { ImprimirService } from '../servicios/imprimir.service';
import { EncorreoService } from '../servicios/encorreo.service';
import { Correos } from '../interfaz/correos';

@Component({
  selector: 'app-reporte',
  templateUrl: './reporte.component.html',
  styleUrl: './reporte.component.scss'
})
export class ReporteComponent implements OnInit {

  // asignacion: boolean = false;
  // mantenimiento: boolean = false;
  // entrada: boolean = false;
  // registros: boolean = false;
  // descargoBN: boolean = false;
  // soliciudes: boolean = false;
  // todo: boolean = false;

  appcontraloria: Appcontraloria[] = [];
  registroasignar = 0;
  registroelim: number = 0;

  appcontraloriaman: Appcontraloria[] = [];
  registromatenimiento = 0;

  appcontraloriare: Appcontraloria[] = [];
  registroregistro = 0;
  registrousu = 0;

  appcontraloriaent: Appcontraloria[] = [];
  ultimaCarga: Date | [] = [];
  registrosent = 0;
  registroactu = 0;

  appcontraloriasoli:Correos[]=[];

  appcontraloriaBN: Appcontraloria[] = [];
  registrosBN =0; 

  idFrozen: boolean = false;

  dialogVisible: boolean = false;
  dialogVisiblere: boolean = false;
  dialogVisibleen: boolean = false;
  dialogVisiblesi: boolean = false;
  dialogVisiblema: boolean = false;
  dialogVisiblede: boolean = false;
  dialogVisibletodo: boolean = false;

  constructor(private registrosService: RegistrosService,
    private serviciocorreo: EncorreoService,
    private imprimir: ImprimirService
  ) { }

  // toggleasignacion(event: any) {
  //   this.asignacion = event.checked;
  // }
  // togglematenimiento(event: any) {
  //   this.mantenimiento = event.checked;
  // }
  // toggleentrada(event: any) {
  //   this.entrada = event.checked;
  // }
  // toggleregistros(event: any) {
  //   this.registros = event.checked;
  // }
  // toggledescargo(event: any) {
  //   this.descargoBN = event.checked;
  // }
  // togglesolicitudes(event: any) {
  //   this.soliciudes = event.checked;
  // }
  // toggletodo(event: any) {
  //   this.todo = event.checked;
  // }

  getSeverity(estatu: string){
    switch(estatu) {
      case 'Aprobado':
        return 'success';
      case 'En espera':
        return 'warning';
      case 'Rechazado':
        return 'danger';
      default:
        return undefined;
    }
  }
  ngOnInit(): void {
    //asignacion
    this.registrosService.getPlaces().subscribe(appcontraloria => {
      this.appcontraloria = appcontraloria.filter(asig =>
        asig.cedula && asig.usuario && asig.Departamento
      );

      this.registroasignar = this.appcontraloria.length;

      this.registroelim = appcontraloria.filter(asig => asig.fecha_de_descargoBN).length;
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

          if (fechaEntrada > this.ultimaCarga && !item.fecha_de_descargoBN && item.fecha_de_entrada) {
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
    //descargo-BN
    this.registrosService.getPlaces().subscribe(appcontraloriaBN => {
      this.appcontraloriaBN = appcontraloriaBN.filter(item => item.fecha_de_descargoBN && !item.fecha_de_borrados);
      this.registrosBN = this.appcontraloriaBN.length;
    });

    //solicitudes
    this.serviciocorreo.getPlaces().subscribe(appcontraloriaSoli => {
      this.appcontraloriasoli = appcontraloriaSoli;
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
    const htmlContent = `-Sean actualizado ${this.registroregistro} dispositivo, quedo ${this.registrousu} libres para asignar nuevamente y 
    sean enviado ${this.registroelim} registros al Descargo de BN`;

    this.imprimir.imprimir(encabezado, cuerpo, "Reporte de los cambios de Registros", true, htmlContent);
  }

  //Entrada
  onImprimirEntrada() {
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
    const htmlContent = `-Sean agregado ${this.registrosent} dispositivo, sean actualizado ${this.registroregistro} y sean enviado ${this.registroelim} registros al Descargo de BN.`;

    this.imprimir.imprimir(encabezado, cuerpo, "Reporte de los cambios de las entradas", true, htmlContent);
  }

  //Asignacion
  onImprimirAsignacion() {
    const encabezado = ["Dispositivo", "Serial", "Cedula", "Usuario", "Departamento", "OS", "CPU", "Memoria", "Almacenamiento"];
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
    const htmlContent = `-Sean asiginado ${this.registroasignar} dispositivos.`;
    this.imprimir.imprimir(encabezado, cuerpo, "Reporte de los cambios de los dipositivos asignados", true, htmlContent);
  }

  //Mantenimiento
  onImprimirManteni() {
    const encabezado = ["Dispositivo", "Serial", "Placa", "Tipo de mantenimiento", "Descripcion", "Fisico y Logico", "Defragmentacion", "Fecha de mantenimiento"];
    const cuerpo = this.appcontraloriaman
      .filter(item => item.tipo_de_mantenimiento && item.mantenimiento && item.defragmentacion)
      .map(item => {
        return [
          item.dispositivo,
          item.serial,
          item.placa,
          item.tipo_de_mantenimiento,
          item.mantenimiento,
          item.memoria + '' + item.almacenamiento + '' + item.limpieza + '' + item.os,
          item.defragmentacion,
          item.fecha_de_mantenimiento
        ];
      });
    const htmlContent = `-Se le an hecho mantenimiento a ${this.registromatenimiento} dispositivos.`;
    this.imprimir.imprimir(encabezado, cuerpo, "Reporte de los cambios de mantenimiento", true, htmlContent);
  }
  //descargo-BN
  onImprimirdescargoBN() {
    const encabezado = ["Dispositivo", "Modelo", "Serial", "Placa", "Bienes Nacionales", "Fecha de descargo-BN"];
    const cuerpo = this.appcontraloriaBN
      .filter(descargo => descargo.fecha_de_descargoBN)
      .map(descargo => {
        return [
          descargo.dispositivo,
          descargo.modelo,
          descargo.serial,
          descargo.placa,
          descargo.bienes_nacionales,
          descargo.fecha_de_descargoBN
        ];
      });
    const htmlContent = `
    -Sean enviado ${this.registrosBN} registros al Descargo de BN.
    `;

    this.imprimir.imprimir(encabezado, cuerpo, "Reporte de los registros enviado a descargo de bienes nacionales", true, htmlContent);
  }
  //solicitudes
  onImprimirsolicitudes() {
    const encabezado = ["Correo", "Asunto", "Solicitudes", "Comentario", "Fecha solicitud", "Fecha resultado"];
    const cuerpo = this.appcontraloriasoli
      .map(solicitud => {
        return [
          solicitud.correo,
          solicitud.asunto,
          solicitud.mensaje,
          solicitud.comentario,
          solicitud.fecha_solicitud,
          solicitud.fecha_respuesta
        ];
      });
   
    this.imprimir.imprimir(encabezado, cuerpo, "Reporte de las solicitudes", true);
  }

  onImprimirTodos() {
    //registro
    const encabezado1 = ["Dispositivo", "Modelo", "Serial", "Placa", "Bienes Nacionales", "Usuario", "Departamento", "Mantenimiento"];
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
    const encabezado2 = ["Dispositivo", "Modelo", "Serial", "Placa", "Bienes Nacionales", "Fecha de entrada", "Fecha de actualización"];
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
    const encabezado3 = ["Dispositivo", "Serial", "Cedula", "Usuario", "Departamento", "OS", "CPU", "Memoria", "Almacenamiento"];
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
    const encabezado4 = ["Dispositivo", "Serial", "Placa", "Tipo de mantenimiento", "Descripcion", "Fisico y Logico", "Defragmentacion", "Fecha de mantenimiento"];
    const cuerpo4 = this.appcontraloriaman
      .filter(item => item.tipo_de_mantenimiento && item.mantenimiento && item.defragmentacion)
      .map(item => {
        return [
          item.dispositivo,
          item.serial,
          item.placa,
          item.tipo_de_mantenimiento,
          item.mantenimiento,
          item.memoria + '' + item.almacenamiento + '' + item.limpieza + '' + item.os,
          item.defragmentacion,
          item.fecha_de_mantenimiento
        ];
      });
    //descargo-BN
    const encabezado = ["Dispositivo", "Modelo", "Serial", "Placa", "Bienes Nacionales", "Fecha de descargo-BN"];
    const cuerpo = this.appcontraloriaBN
      .filter(item => item.fecha_de_descargoBN)
      .map(descargo => {
        return [
          descargo.dispositivo,
          descargo.modelo,
          descargo.serial,
          descargo.placa,
          descargo.bienes_nacionales,
          descargo.fecha_de_descargoBN
        ];
      });

      //solicitudes
      const encabezadosoli = ["Correo", "Asunto", "Solicitudes", "Comentario", "Fecha solicitud", "Fecha resultado"];
    const cuerposoli = this.appcontraloriasoli
      .map(solicitud => {
        return [
          solicitud.correo,
          solicitud.asunto,
          solicitud.mensaje,
          solicitud.comentario,
          solicitud.fecha_solicitud,
          solicitud.fecha_respuesta
        ];
      });

    const encabezados = [encabezado1, encabezado2, encabezado3, encabezado4, encabezado, encabezadosoli];
    const cuerpos = [cuerpo1, cuerpo2, cuerpo3, cuerpo4, cuerpo, cuerposoli];

    const htmlContent = `Reporte:

    -Sean actualizado ${this.registroregistro} dispositivo, se an agregado ${this.registrosent} dispositivo, sean asingando ${this.registroasignar} dispositivos, 
    se le an hecho mantenimiento a ${this.registromatenimiento} dispositivos, quedo libres ${this.registrousu} para asignar nuevamente 
    y sean enviado ${this.registrosBN} registros al Descargo de BN.
    
    `;

    this.imprimir.imprimirTodas(encabezados, cuerpos, ["Reporte de los cambios de Registros", "Reporte de los cambios de las entradas", "Reporte de los cambios de los dispositivos asignados", "Reporte de los cambios de mantenimiento", "Registros enviado a descargo de bienes nacionales","Reporte de las solicitudes"], true, htmlContent);
  }
  showDialog() {
    this.dialogVisible = true;
}
showDialogre() {
  this.dialogVisiblere = true;
}
showDialogen() {
  this.dialogVisibleen = true;
}
showDialogsi() {
  this.dialogVisiblesi = true;
}
showDialogma() {
  this.dialogVisiblema = true;
}
showDialogde() {
  this.dialogVisiblede = true;
}
showDialogtodo() {
  this.dialogVisibletodo = true;
}
}