import { Component, OnInit } from '@angular/core';
import { UserSettings } from '../data/user-settings';
import { NgForm } from '@angular/forms';
import { DataService } from '../data/data.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-user-settings-form',
  templateUrl: './user-settings-form.component.html',
  styleUrls: ['./user-settings-form.component.css']
})
export class UserSettingsFormComponent implements OnInit {

  originalUserSettings: UserSettings = {
    name: 'Marcel',
    emailOffers: true,
    interfaceStyle: 'dark',
    subscriptionType: 'Annual',
    notes: 'Here are some notes'    
  }

  userSettings: UserSettings = {...this.originalUserSettings}
  postError : boolean = false;
  postErrorMessage = '';
  // subscriptionType = ['one', 'two', 'three'];
  subscriptionType : Observable<string[]>;

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.subscriptionType = this.dataService.getSubscriptionTypes();
  }

  onHttpError(error: any){
    console.log('error ', error);
    this.postError = true;
    this.postErrorMessage = 'An error occured in the network';
  }

  onSubmit(form: NgForm){
    console.log('in onsubmmit ', form.valid);

    if(form.valid){
      this.dataService.postUserSettingsForm(this.userSettings).subscribe(
        result => console.log("Logging out the result: ", result),
        error => this.onHttpError(error)
      );
    }else{
      this.postError = true;
      this.postErrorMessage = 'Some important fields has been left unattended to';
    }
  }
}
