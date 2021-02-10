import { Component, OnInit } from '@angular/core';
import { ApiService } from '../app/services/api-service.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  title = 'fhir-app-test';
  resultData:any =[];
  headers:any = [ "Name", "Gender","BirthDate","ID" ,"City", "Country"];
  patientForm:FormGroup;
  lastRequestTime:Date;
  retrivingData:boolean = false;


  constructor(
    private apiService: ApiService, private fb:FormBuilder
  ) { 
    this.createPatientForm();
  }

  ngOnInit() {
    this.getPatients();
  }
  getPatients(){
    this.lastRequestTime = new Date();
    this.apiService.getPatients().subscribe(
      data => {
        this.resultData = this.formatData(data);
        console.log(this.resultData);
       
      }
    )
  }
  createPatientForm(){
    this.patientForm = this.fb.group({
      name: ['', [Validators.required,Validators.pattern('^[a-zA-Z ]*$')]],
      dob:[new Date(), Validators.required]
    })
  }

  formatData(data){
    let formattedData =[];
    if(data.entry){
    data.entry.forEach(element => {
      let patientObject:any = {};
      patientObject.birthDate = element.resource.birthDate;
      patientObject.gender = element.resource.gender;
      patientObject.name = element.resource.name && (element.resource.name[0].family|| '') + (element.resource.name[0].given && element.resource.name[0].given[0] ||'');
      patientObject.id = element.resource.id;
      if(element.resource.address){
        patientObject.city = element.resource.address[0].city || '';
        patientObject.country = element.resource.address[0].country || '';
      }
      formattedData.push(patientObject);
    });
  }
    return this.sortData(formattedData);
  }
   sortData(data) {
    return data.sort((a, b) => {
      return <any>new Date(a.birthDate) - <any>new Date(b.birthDate);
    });
  }
  reset(){
    this.patientForm.reset();
    this.getPatients();
  }
  formSubmitted(){
    
    console.log(this.patientForm.value);
    if(this.patientForm.valid){
      this.retrivingData = true;
      this.apiService.searchPatients(this.patientForm.value.name,this.patientForm.value.dob).subscribe(
        data => {
          this.retrivingData = false;
          this.resultData = this.formatData(data);
          console.log(this.resultData);
        }
      )
    }
  }
}


