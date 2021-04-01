import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { CommonModule, registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzCardModule } from 'ng-zorro-antd/card';

import { AccountAPI } from 'src/app/service/service.accountapi';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { ShowallComponent } from './pages/manageaccount/showall/showall.component';
import { enableProdMode } from '@angular/core';
import { ProductShowComponent } from './pages/product/product-show/product-show.component';
import { SharedModule } from './shared/shared.module';
import { ProductAPI } from './service/service.productapi';
import { ProductEditComponent } from './pages/product/product-edit/product-edit.component';
import { NgbAlertModule, NgbModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
registerLocaleData(en);
enableProdMode();

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    ShowallComponent,
    ProductShowComponent,
    ProductEditComponent,
  ],
  imports: [
    SharedModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NzFormModule,
    NzButtonModule,
    NzIconModule,
    NzCheckboxModule,
    NzInputModule,
    CommonModule,
    NzPaginationModule,
    NzListModule,
    NzCardModule,
    NgbModule,
    NgbPaginationModule,
    NgbAlertModule,
  ],
  providers: [{ provide: NZ_I18N, useValue: en_US }, AccountAPI, ProductAPI],
  bootstrap: [AppComponent],
})
export class AppModule {}
