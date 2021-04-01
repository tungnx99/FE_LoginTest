import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from './base.service';
import { environment } from 'src/environments/environment';

@Injectable()
export class AccountAPI extends BaseService {
  messange: string = '';

  constructor(http: HttpClient) {
    super(http);
  }

  ngOnInit(): void {}

  saveAccount(body: any) {
    return this.post<any>(
      `${environment.host}/api/account`,
      body
    );
  }

  getAccount(params: {}, headers: {}) {
    return this.get<any>(`${environment.host}/api/account/`, {
      params: params,
      headers: headers,
    });
  }
}
