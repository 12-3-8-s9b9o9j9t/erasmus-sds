import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { getID, getName, saveName } from '../services/storage.service';
import { ApiHelperService } from '../services/api-helper.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  nameControl = new FormControl('', [Validators.required,]);
  passwordControl = new FormControl('', [Validators.required,]);

  formGroup = new FormGroup({
    name: this.nameControl,
    password: this.passwordControl,
  });

  constructor(private api: ApiHelperService) { }

  ngOnInit(): void {
    this.nameControl.setValue(getName());
  }

  updateProfile(): void {
    try {
      console.log("Updating profile")
      this.api.patch({ endpoint: '/users/'+getID(), data: {username: this.nameControl.value, password: this.passwordControl.value}})
      if (this.nameControl.value !== null) {
        saveName(this.nameControl.value);
      }
    } catch (error) {
      console.log("Error updating profile")
      //console.error(error);
    }
    
  }
}
