import { Component, NgModule, VERSION } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Data } from './data';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
    name='';
    email='';
    subject1= null;
    subject2= null;
    subject3= null;
  
    public globalData: Data[] = [];
    localData:Data[]=[];
    register(registerForm: NgForm) {
      const TempData: Data = {
        name: registerForm.value.fname,
        email: registerForm.value.femail,
        subject1: registerForm.value.fsubject1,
        subject2: registerForm.value.fsubject2,
        subject3: registerForm.value.fsubject3,
      };
      this.globalData.push(TempData);
      this.clearForm();
      this.clearLocalData();
      this.globalData.forEach((data) => {
        this.localData.push(data);
      });
    }
    
    clearForm() {
      this.name = '';
      this.email = '';
      this.subject1 = null;
      this.subject2 = null;
      this.subject3 = null;
    }
    clearLocalData() {
      this.localData.length = 0;
    }
    clearFilter(){
      this.clearLocalData();
      this.globalData.forEach((data) => {
        this.localData.push(data);
      });
    }

    clearGlobalData(){
      this.globalData.length = 0;
      this.clearLocalData();
    }
    
    //Applying filters
  
    constraint='';
    value1 = 0;
    value2 = 0;
    filterBy='';
    
    applyFilter() {
      this.localData.length = 0;  
      switch (this.filterBy) {
        case 'subject1': { 
          this.globalData.forEach((data) => {
            this.filterValues(Number(data.subject1), data);
          });
          break;
        }
        case 'subject2': {
          this.globalData.forEach((data) => {
            this.filterValues(Number(data.subject2), data);
          });
          break;
        }
        case 'subject3': {
          this.globalData.forEach((data) => {
            this.filterValues(Number(data.subject3), data);
          });
          break;
        }
      }
    }
    
    filterValues(num: number, data: Data) {
      if (this.constraint === 'above' && num > this.value1) {
        this.localData.push(data);
      } else if (this.constraint === 'below' && num < this.value1) {
        this.localData.push(data);
      } else if (
        this.constraint === 'between' &&
        num > this.value1 &&
        num < this.value2
      ) {
        this.localData.push(data);
      } else if (this.constraint === 'all') {
        this.localData.push(data);
      }
    }
  }
