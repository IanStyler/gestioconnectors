import { Component } from '@angular/core';
import {ConnectorBDService} from "./connector-bd.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'gestioconnectors';
  dades ={
    col1: '41596180J',
    col2: 11,
    col3: 'Òscar Herrán'
  };
  constructor(private cServei: ConnectorBDService) {
    //this.cServei.peticioTaula('Taula');
    //this.cServei.inserirDades('DAMOscarHerran.Taula',this.dades);
    this.cServei.modificarDades('DAMOscarHerran.Taula','Col2','12','Col3',"'Pep pepet'", "'41596180J'");
  }
}

