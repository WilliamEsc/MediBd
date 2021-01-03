import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface Data {
  obj: Object,
  value: any;
}

@Injectable({
  providedIn: 'root'
})
export class DonneesService {

  constructor(private http: HttpClient) { }

  getData(data) {
    let addrApi = '/api/getMedi';
    return this.http.post<Data>(addrApi,data);
  }

  getAllMedi() {
    let addrApi = '/api/getAllMedi';
    return this.http.get<Data>(addrApi);
  }

  getForme(){
    let addrApi ='/api/getForme';
    return this.http.get<Data>(addrApi);
  }

  getVoies(){
    let addrApi ='/api/getVoies';
    return this.http.get<Data>(addrApi);
  }

  getAMM(){
    let addrApi ='/api/getAMM';
    return this.http.get<Data>(addrApi);
  }

  getTitulaire(){
    let addrApi ='/api/getTitulaire';
    return this.http.get<Data>(addrApi);
  }

  getPropPrincAnnee(data){
    let addrApi ='/api/getPropPrincAnnee';
    return this.http.post<Data>(addrApi,data);
  }

  getPropPrincLab(data=''){
    let addrApi ='/api/getPropPrincLab';
    return this.http.post<Data>(addrApi,{titulaire:data});
  }
}
