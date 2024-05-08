import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-solicitudes',
  templateUrl: './solicitudes.component.html',
  styleUrl: './solicitudes.component.scss'
})
export class SolicitudesComponent implements OnInit {

  activo : boolean = false;
  
  constructor(){}

  ngOnInit(): void {
    
  }

  setactivo(): void{
    this.activo =!this.activo;
  }
}
