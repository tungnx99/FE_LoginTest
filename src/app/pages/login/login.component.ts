import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { isNull } from 'lodash';
import { AccountAPI } from 'src/app/service/service.accountapi';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
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
    if (!this.validateForm.errors) {
      this.body = {
        userName: this.validateForm.controls['userName'].value,
        password: this.validateForm.controls['password'].value,
      };
      await this.accountAPI.saveAccount(this.body).subscribe((res) => {
        if (res.status == 0) {
          localStorage.setItem('token', res.data);
          setTimeout(() => localStorage.removeItem('token'), 180000);
          this.messange = 'success';
          this.router.navigate(['/account/showall']);
        }
        if (res.status != 0) {
          this.messange = res.data;
        }
      });
    }
  }

  constructor(
    private fb: FormBuilder,
    private accountAPI: AccountAPI,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (isNull(localStorage.getItem('token'))) {
    }
    this.validateForm = this.fb.group({
      userName: [null, [Validators.required]],
      password: [null, [Validators.required]],
      remember: [true],
    });
  }
}
