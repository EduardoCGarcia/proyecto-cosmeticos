import { Injectable } from '@angular/core';
import { jsPDF } from "jspdf";
import autoTable, { Row } from 'jspdf-autotable';
import { map } from 'rxjs';
import { Venta } from './ventas.service';


@Injectable({
  providedIn: 'root'
})
export class ImpresionService {
  constructor() { }
  imprimir(principal: string, encabezado: string[], cuerpo:Array<Venta>, titulo:string, nombre:string, organismo:string, guardar?:boolean){
    var nombresMeses = [
      'Enero',
      'Febrero',
      'Marzo',
      'Abril',
      'Mayo',
      'Junio',
      'Julio',
      'Agosto',
      'Septiembre',
      'Octubre',
      'Noviembre',
      'Diciembre'
    ];
    var imgData = 'logo.png';
    var fecha = new Date();
    var numeroDia = fecha.getDate();
    var nombreMes = nombresMeses[fecha.getMonth()];
    var anio = fecha.getFullYear();

    var fechaFormateada = numeroDia + '/' + nombreMes + '/' + anio;
    
    const doc = new jsPDF({
      orientation: "portrait",
      unit: "px",
      format: 'letter'
    });
    doc.setFontSize(8); // Establece el tamaño de la fuente
    doc.setFont('helvetica'); // Establece la fuente
    doc.text('Fecha: ' + fechaFormateada,365,18); // Cambia las coordenadas (10, 10) según tus necesidades
    
    
    var tableStyle1 = {
      margin: { top: 20 },
      fontSize: 12,
      fontStyle: 'normal',
      textColor: [0, 0, 0],
      fillColor: [220, 220, 220],
      lineWidth: 0.1,
      lineColor: [0, 0, 0],
      valign: 'middle'
    };
    //doc.addImage(imgData, 'JPEG', 10, 10, 50, 50);
    doc.setFontSize(12);
    doc.text(principal,doc.internal.pageSize.width/2,37,{align:'center'});
    doc.setFontSize(8);
    //doc.text(titulo,doc.internal.pageSize.width/2,25,{align:'center'});
    //doc.text(titulo,doc.internal.pageSize.width/2,25,{align:'center'});
    // Generar la segunda tabla en el documento
    autoTable(doc, {
      startY: 30,
      theme: 'grid',
      styles: {
        fontSize: 6,
        halign: 'center'
      }
    });
    autoTable(doc, {
        startY: 70,
        head: [encabezado],
        body: cuerpo.map((row: Venta) => [
          row.codigo_venta,
          new Date(row.fecha).toISOString().split('T')[0], // Asegúrate de convertir a Date si es necesario
          `${row.cliente?.name} ${row.cliente?.lastname}`, // Nombre completo del cliente
          row.articulos.map(a => a.articulo.nombre).join(', '), // Nombres de los artículos separados por coma
          row.total.toFixed(2) // Formato de número a dos decimales
        ]),
        theme: 'grid',
        styles: {
          fontSize: 6,
          halign: 'center'
        }
      });
    doc.text('Fecha: ' + fechaFormateada, 100, 10); // Cambia las coordenadas (10, 10) según tus necesidades
    

    var totalPages = 0;
    doc.text('Contenido de la página 1', 10, 10); totalPages++;
    
    // Configurar el estilo de la segunda tabla
    var tableStyle2 = {
      margin: { top: 20 },
      fontSize: 12,
      fontStyle: 'normal',
      textColor: [0, 0, 0],
      fillColor: [255, 255, 255],
      lineWidth: 0.1,
      lineColor: [0, 0, 0],
      valign: 'middle'
    };
    
    // Configurar el estilo para el número de página
    var pageStyle = {
      align: 'right',
      fontSize: 10,
      fontStyle: 'normal',
      textColor: [100, 100, 100],
      x: doc.internal.pageSize.width - 20,
      y: doc.internal.pageSize.height - 10
    };

    //doc.onPageAdded = function(page) {
      //doc.text(`Página ${page}`, pageStyle.x, pageStyle.y);
    //};
    //doc.save('Reporte_de_inventariado')
    if(guardar){
      const hoy = new Date();
      //doc.save(hoy.getDate()+hoy.getMonth()+hoy.getFullYear()+hoy.getTime()+'pdf');
      doc.save('Bienes patrimoniales')
    }else{

    }
  }

  imprimirTicket(doc: jsPDF, venta: any) {
    var nombresMeses = [
        'Enero',
        'Febrero',
        'Marzo',
        'Abril',
        'Mayo',
        'Junio',
        'Julio',
        'Agosto',
        'Septiembre',
        'Octubre',
        'Noviembre',
        'Diciembre'
      ];
      var imgData = 'logo.png';
      var fecha = new Date();
      var numeroDia = fecha.getDate();
      var nombreMes = nombresMeses[fecha.getMonth()];
      var anio = fecha.getFullYear();
  
      var fechaFormateada = numeroDia + '/' + nombreMes + '/' + anio;
      var fechaLimite = (numeroDia+3) + '/' + nombreMes + '/' + anio;
      
      doc.text('Fecha: ' + fechaFormateada,100,10); // Cambia las coordenadas (10, 10) según tus necesidades
      doc.text('Fecha limite: ' + fechaLimite,100,20); // Cambia las coordenadas (10, 10) según tus necesidades
    
      


    const folio = `Folio: ${venta.codigo_venta}`;
    const cliente = `Cliente: ${venta.cliente.name} ${venta.cliente.lastname}`;
    const encabezado = ['Producto', 'Cantidad', 'Precio Unitario'];
  
    const cuerpo = venta.articulos.map((item: any) => [
      item.articulo.nombre,
      item.cantidad.toString(),
      item.precio_unitario.toFixed(2)
    ]);
  
    doc.text(folio, 10, 10);
    doc.text(cliente, 10, 20);
  
    let finalY = 30; // Posición inicial de la tabla
  
    autoTable(doc, {
      startY: finalY,
      head: [encabezado],
      body: cuerpo,
      theme: 'grid',
      styles: {
        fontSize: 6,
        halign: 'center'
      },
      didDrawPage: (data) => {
        finalY = data.cursor?.y ?? finalY; // Asignar `finalY` o mantener su valor si `data.cursor?.y` es `undefined`
      }
    });
  
    const total = `Total: ${venta.total.toFixed(2)}`;
    doc.text(total, 10, finalY + 10); // Posicionar el total debajo de la tabla
  
    doc.save(`ticket_${venta.codigo_venta}.pdf`);
  }
  
}