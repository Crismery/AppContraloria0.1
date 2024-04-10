import { Injectable } from '@angular/core';
import { jsPDF } from "jspdf";
import autoTable from 'jspdf-autotable';
import 'jspdf-autotable';

@Injectable({
  providedIn: 'root'
})
export class ImprimirService {

  constructor() { }

  imprimir(encabezado: string[], cuerpo: Array<any>, titulo: string, guardar?: boolean) {
    const doc = new jsPDF({
      orientation: "portrait",
      unit: "px",
      format: 'letter'
    });
    doc.setFontSize(10);

    const date = new Date();
    const dateString = (date.getMonth() + 1) + '/' + date.getDate() + '/' + (date.getFullYear().toString().substr(-2));
    const timeString = date.getHours() + ':' + (date.getMinutes()<10?'0':'') + date.getMinutes();
      
    doc.text(dateString + ', ' + timeString, 10, 10);
    
    const appName = "Appcontraloria";
    const anchoAppName = doc.getTextWidth(appName);
    const posicionCentro1 = (doc.internal.pageSize.width - anchoAppName) / 2;
    doc.text(appName, posicionCentro1, 10);

    doc.text(titulo, doc.internal.pageSize.width / 2, 25, { align: 'center' });

    const img1 = 'assets/Captura.png'; 
    doc.addImage(img1, 'PNG', 5, 25, 30, 30); 
    doc.text('CONTRALORIA | REPORTE', 30, 40); 

    doc.setLineWidth(1.7); 
    doc.line(6, 60, doc.internal.pageSize.width - 6, 60); 

    const img2 = 'assets/reporte.png'; 
    doc.addImage(img2, 'PNG', 5, 80, 25, 25); 
    doc.text('Reporte', 30, 100); 

    autoTable(doc, {
      startY: 110, 
      columnStyles: { europe: { halign: 'center' } },
      head: [encabezado],
      body: cuerpo,
    });

    if (guardar) {
      const nombreAplicacion = "Appcontraloria reporte individual"; 
      doc.save(nombreAplicacion + ".pdf");
    } else {
      doc.output('dataurlnewwindow');
    }
}
  //Imprimir todo...
  imprimirTodas(encabezados: string[][], cuerpos: any[][][], titulos: string[], guardar?: boolean) {
    const doc = new jsPDF({
      orientation: "portrait",
      unit: "px",
      format: 'letter'
    });

    let yPosition = 25;

    titulos.forEach((titulo, index) => {
      doc.setFontSize(10);

      const date = new Date();
      const dateString = (date.getMonth() + 1) + '/' + date.getDate() + '/' + (date.getFullYear().toString().substr(-2));
      const timeString = date.getHours() + ':' + (date.getMinutes() < 10 ? '0' : '') + date.getMinutes();

      doc.text(dateString + ', ' + timeString, 10, 10);

      const appName = "Appcontraloria";
      const anchoAppName = doc.getTextWidth(appName);
      const posicionCentro1 = (doc.internal.pageSize.width - anchoAppName) / 2;
      doc.text(appName, posicionCentro1, 10);

      const anchoTitulo = doc.getTextWidth(titulo);
      const posicionCentro = (doc.internal.pageSize.width - anchoTitulo) / 2;

      doc.text(titulo, posicionCentro, yPosition);

      yPosition += 25;

      const img1 = 'assets/Captura.png'; 
    doc.addImage(img1, 'PNG', 5, 25, 30, 30); 
    doc.text('CONTRALORIA | REPORTE', 30, 40); 

    doc.setLineWidth(1.7); 
    doc.line(6, 60, doc.internal.pageSize.width - 6, 60); 

    const img2 = 'assets/reporte.png'; 
    doc.addImage(img2, 'PNG', 5, 80, 25, 25); 
    doc.text('Reporte', 30, 100); 

      autoTable(doc, {
        head: [encabezados[index]],
        body: cuerpos[index],
        startY: yPosition,
        margin: { top: 10 }
      });

      const numberOfRows = cuerpos[index].length;
      const rowHeight = 25;

      const tableHeight = numberOfRows * rowHeight + (numberOfRows * rowHeight * 0.1);

      yPosition += tableHeight + 40;
    });

    if (guardar) {
      const nombreAplicacion = "Appcontraloria reporte";
      doc.save(nombreAplicacion + ".pdf");
    } else {
      doc.output('dataurlnewwindow');
    }
  }
}
