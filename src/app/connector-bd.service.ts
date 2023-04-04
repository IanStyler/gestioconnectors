import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {subscribeOn} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ConnectorBDService {
  constructor(private http: HttpClient) {
    //E4
    this.http.get<any>('http://localhost:3080/api/selectClients').forEach((data) => {
      console.log(data);
    })
  }

  //E5
  public peticioTaula(nomTaula: any) {
    this.http.post<any>('http://localhost:3080/api/creaTaula', {
      Nom: nomTaula
    }).subscribe();
  }

  public inserirDades(taula: any, dades: any) {
    const query = `INSERT INTO ${taula} (Col1, Col2, Col3) VALUES (?, ?, ?)`;
    const valors = [dades.col1, dades.col2, dades.col3];
    return this.http.post(`http://localhost:3080/inserirDades`, {query, valors}).subscribe();
  }


  public modificarDades(taula: any, col1: any, col1Nv: any, col2: any, col2Nv: any, id: any) {
    const query = `UPDATE ${taula} SET ${col1} = ${col1Nv}, ${col2} = ${col2Nv} WHERE Col1 = ${id}`;
    return this.http.post(`http://localhost:3080/actualitzarDades`, {query}).subscribe();
  }
}
