import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AccountAPI } from 'src/app/service/service.accountapi';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  validateForm!: FormGroup;
  messange: string = '';
  body: any = {};
  header: any = {};

 async submitForm() {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    if(!this.validateForm.errors)
    {
      this.body = {
        userName: this.validateForm.controls["userName"].value,
        password: this.validateForm.controls["password"].value
      }
      this.messange = await this.accountAPI.httpAccountAPI(this.body);
    }
  }

  constructor(private fb: FormBuilder, private http: HttpClient, private accountAPI: AccountAPI) {}

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      userName: [null, [Validators.required]],
      password: [null, [Validators.required]],
      remember: [true]
    });
  }
}
