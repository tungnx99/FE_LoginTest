import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

 
@Injectable()
export class AccountAPI {
    messange: string = "";

    constructor(private http: HttpClient) { }

    ngOnInit(): void {
    }

    async httpAccountAPI(body: any)
    {
      return await this.http.post<any>('https://localhost:44309/api/account', body).toPromise();
    }
}