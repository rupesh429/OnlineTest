import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private httpClient: HttpClient
  ) { }

  getPatients() {
    return this.httpClient.get(environment.queryURI + '/Patient?birthdate=gt1960-01-01T00:00&birthdate=lt1965-12-31T23:59',
      { headers: this.getHeaders() });
  }
  searchPatients(name,dob){
    return this.httpClient.get(environment.queryURI + `/Patient?name=${name}&birthdate=${dob}`,
      { headers: this.getHeaders() });
  }

  private getHeaders(): HttpHeaders {
    const headers = new HttpHeaders({
      'Content-Type': 'application/fhir+json'
    });
    return headers;
  }
}


