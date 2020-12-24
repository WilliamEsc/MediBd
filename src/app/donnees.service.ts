import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface Data {
  obj: Object,
  value: Array<string>;
}

@Injectable({
  providedIn: 'root'
})
export class DonneesService {

  constructor(private http: HttpClient) { }

  getData(data) {
    let addrApi = '/api/getMedi';
    return this.http.post<Data>(addrApi,data);
    /*     if (Object.keys(data).length > 0) {
      addrApi += '?';
      Object.entries(data).forEach(([key, value], index) => {
        if (index > 0) {
          addrApi += '&';
        }
        addrApi += key + '=' + value;
      });
    }
    console.log(addrApi); */
    //return this.http.get<Data>(addrApi);
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

  getPropPrincLab(){
    let addrApi ='/api/getPropPrincLab';
    return this.http.get<Data>(addrApi);
  }
}
