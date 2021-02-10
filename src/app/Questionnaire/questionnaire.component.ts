import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormArray} from '@angular/forms';
import * as data from '../../assets/questionnaire.json';

@Component({
  selector: 'app-questionnaire',
  templateUrl: './questionnaire.component.html'
})

export class QuestionnaireComponent implements OnInit {
    QuestionaireForm:FormGroup;
    QuestionaireJson:any ={};
    formattedJson =[];


  constructor(
     private fb:FormBuilder
  ) { 
    
  }

  ngOnInit() {
    this.QuestionaireForm = this.fb.group({
      questions:this.fb.array([])
    })
    this.formatdata(data.item);
    this.generateForm();
  }
  generateForm(){
    this.formattedJson.forEach(t=>{
    let questions =<FormArray> this.QuestionaireForm.controls["questions"]; 
     questions.push(this.fb.group({
       [`${t.linkId}`]:[t.type === 'boolean'?false:'',t.type !== 'boolean'?false:'']
     }))
    })
    console.log(this.QuestionaireForm);
  }
  formatdata(data){
    data.forEach((obj) =>{
      if(obj.type=== 'boolean' || obj.type === 'string'){
      this.formattedJson.push({
        type:obj.type,
        text:obj.text,
        linkId:obj.linkId
      })
    }else if(obj.type === 'group'){
        this.formatdata(obj.item)
    }
  })}
}


