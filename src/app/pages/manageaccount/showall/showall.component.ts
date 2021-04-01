import { HttpHeaders, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { range } from 'lodash';
import { AccountAPI } from 'src/app/service/service.accountapi';

@Component({
  selector: 'app-showall',
  templateUrl: './showall.component.html',
  styleUrls: ['./showall.component.scss'],
})
export class ShowallComponent implements OnInit {
  data: any = {};

  get pagelist() {
    return this.data ? range(1, this.data.totalPage + 1) : [];
  }
  constructor(private accountAPI: AccountAPI) {}

  async ngOnInit() {
    this.onPageIndexChange(1);
  }

  onPageIndexChange(pageNumber: number) {
    let params = {
      pageNumber: pageNumber,
    };
    let header = {
      Authorization: 'bearer ' + localStorage.getItem('token'),
    };
    this.accountAPI.getAccount(params, header).subscribe((res: any) => {
      if(res.status == 0)
      {
        this.data = res.data;
      }
    });
  }
}
