import { Xtb } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { jsPDF } from "jspdf";
import autoTable from 'jspdf-autotable';
import 'jspdf-autotable';

@Injectable({
  providedIn: 'root'
})
export class ImprimirService {

  constructor() { }

  imprimir(encabezado: string[], cuerpo: Array<any>, titulo: string, guardar?: boolean, htmlContent?:string) {
    const doc = new jsPDF({
      orientation: "portrait",
      unit: "px",
      format: 'letter'
    });

    const date = new Date();
    const dateString = date.getDate() + '/' + (date.getMonth() + 1) + '/' + (date.getFullYear().toString().substr(-4));
    const timeString = date.getHours() + ':' + (date.getMinutes()<10?'0':'') + date.getMinutes();
    doc.setFont("'Times New Roman', Times, serif","normal");
    doc.setFontSize(10);
    doc.text(dateString + ', ' + timeString, 10, 10);
    
    const appName = "Appcontraloria";
    const anchoAppName = doc.getTextWidth(appName);
    const posicionCentro1 = (doc.internal.pageSize.width - anchoAppName) / 2;
    doc.setFont("'Times New Roman', Times, serif","normal");
    doc.setFontSize(10);
    doc.text(appName, posicionCentro1, 10);


    const img1Y = 25;
    const img1Height = 30;
    const img2Y = 75;
    const img2Height = 20;
    const tableY = 150;
    const titleY = (img2Y + img2Height + tableY) / 2;
    doc.setFontSize(14);
    doc.text(titulo, doc.internal.pageSize.width / 2, titleY, { align: 'center' });

    const img1 = 'assets/Captura.png'; 
    doc.addImage(img1, 'PNG', 25, img1Y, 30, img1Height); 
    doc.setTextColor(200,200,200);
    doc.setFont("'Times New Roman', Times, serif","normal");
    doc.setFontSize(10);
    doc.text('CONTRALORIA | REPORTE', 25 + 30, img1Y + img1Height + 0); 

    doc.setDrawColor(211, 211, 211);
    doc.setLineWidth(1.7); 
    doc.line(20, 60, doc.internal.pageSize.width - 20, 60); 

    const img2 = 'assets/reporte.png'; 
    doc.addImage(img2, 'PNG', 35, img2Y, 20, img2Height); 
    doc.setTextColor(200,200,200);
    doc.setFontSize(10);
    doc.text('Reporte', 35 + 25, img2Y + img2Height + 0); 

    if (htmlContent) {
      doc.setFontSize(12);
      doc.setTextColor(0, 0, 0);
      doc.text(htmlContent, 90, 140);
    }

    autoTable(doc, {
      startY: tableY, 
      columnStyles: { europe: { halign: 'center' } },
      head: [encabezado],
      body: cuerpo,
      styles: {
        font: 'Times New Roman', // Fuente
        fontStyle: 'normal',     // Estilo de fuente (normal, bold, italic)
        fontSize: 12,            // Tamaño de fuente
        cellPadding: 5,          // Espaciado interno de celda
        fillColor: [256, 255, 255], // Color de fondo de las celdas
        textColor: [0, 0, 0],      // Color de texto
        halign: 'left',            // Alineación horizontal (left, center, right)
        valign: 'middle',          // Alineación vertical (top, middle, bottom)
        cellWidth: 'auto',         // Ancho de celda (auto, wrap)
        minCellHeight: 20,              // Altura de fila
        lineColor: [82, 81, 81] 
      }
    });

    if (guardar) {
      const nombreAplicacion = "Appcontraloria reporte individual"; 
      doc.save(nombreAplicacion + ".pdf");
    } else {
      doc.output('dataurlnewwindow');
    }
}
  //Imprimir todo...
  imprimirTodas(encabezados: string[][], cuerpos: any[][][], titulos: string[], guardar?: boolean, htmlContent?:string) {
    const doc = new jsPDF({
      orientation: "portrait",
      unit: "px",
      format: 'letter'
    });
  
    let yPositionTitulo = 180; 
    let primeraPagina = true;

    doc.internal.events.subscribe('addPage', () => {
      primeraPagina = false; 
  });
  
    titulos.forEach((titulo, index) => {

      const tituloHeight = 30; // Altura estimada del título
      const tableHeight = 30 * cuerpos[index].length; // Altura estimada de la tabla (25 es la altura de cada fila)
      const totalHeight = tituloHeight + tableHeight; // Altura total de la tabla y el título
  
      // Verificar si hay suficiente espacio en la página actual para la tabla y su título
      if (yPositionTitulo + totalHeight > doc.internal.pageSize.height) {
          doc.addPage(); // Cambiar a la siguiente página
          yPositionTitulo = 20; // Ajustar la posición del título en la nueva página
      }
  
      const date = new Date();
      const dateString = date.getDate() + '/' + (date.getMonth() + 1) + '/' + (date.getFullYear().toString().substr(-2));
      const timeString = date.getHours() + ':' + (date.getMinutes() < 10 ? '0' : '') + date.getMinutes();
      doc.setTextColor(0, 0, 0);
      doc.setFont("'Times New Roman', Times, serif");
      doc.setFontSize(10);
      doc.text(dateString + ', ' + timeString, 10, 10);
  
      const appName = "Appcontraloria";
      const anchoAppName = doc.getTextWidth(appName);
      const posicionCentro1 = (doc.internal.pageSize.width - anchoAppName) / 2;
      doc.setTextColor(0, 0, 0);
      doc.setFont("'Times New Roman', Times, serif");
      doc.setFontSize(10);
      doc.text(appName, posicionCentro1, 10);
  
      if (primeraPagina) {
        const img1 = 'assets/Captura.png'; 
        doc.addImage(img1, 'PNG', 25, 25, 30, 30); 
        doc.setFont("'Times New Roman', Times, serif");
        doc.setTextColor(200,200,200);
        doc.setFontSize(10)
        doc.text('CONTRALORIA | REPORTE', 25 + 30, 50); 
    
        doc.setDrawColor(211, 211, 211);
        doc.setLineWidth(1.7); 
        doc.line(20, 60, doc.internal.pageSize.width - 20, 60); 
    
        // const img2 = 'assets/reporte.png';
        // doc.addImage(img2, 'PNG', 35, 75, 20, 20); 
        // doc.setFont("'Times New Roman', Times, serif");
        // doc.setTextColor(200,200,200);
        // doc.setFontSize(10);
        // doc.text('Reporte', 35 + 25, 90); 

        if (htmlContent) {
            doc.setFontSize(12);
            doc.setTextColor(0, 0, 0);
            doc.setFont("'Times New Roman', Times, serif")
            doc.text(htmlContent, 50, 110);
        }
    }
    const anchoTitulo = doc.getTextWidth(titulo);
      const posicionCentro = (doc.internal.pageSize.width - anchoTitulo) / 2;
  
      doc.setFont("'Times New Roman', Times, serif");
      doc.setTextColor(0, 0, 0);
      doc.setFontSize(14);
      doc.text(titulo, posicionCentro, yPositionTitulo + 15, { align: "center" });
      const yPositionTabla = 30 + yPositionTitulo;
  
      const maxFilas = 10; // Define el número máximo de filas a mostrar
      const filasLimitadas = cuerpos[index].slice(0, maxFilas);

      autoTable(doc, {
        head: [encabezados[index]],
        body: filasLimitadas,
        startY: yPositionTitulo + 40,
        margin: { top: 10 },
        styles: {
          font: 'Times New Roman', 
          fontStyle: 'normal',     
          fontSize: 10,            
          cellPadding: 5,          
          fillColor: [256, 255, 255], 
          textColor: [0, 0, 0],      
          halign: 'left',            
          valign: 'middle',          
          cellWidth: 'auto',         
          minCellHeight: 20 ,             
          lineColor: [82, 81, 81],
        }
      });

      yPositionTitulo += totalHeight + 30; 
    });

  
    if (guardar) {
      const nombreAplicacion = "Appcontraloria reporte";
      doc.save(nombreAplicacion + ".pdf");
    } else {
      doc.output('dataurlnewwindow');
    }
  }  
}