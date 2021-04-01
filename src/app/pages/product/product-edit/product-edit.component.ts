import { Component, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ProductAPI } from 'src/app/service/service.productapi';
import {
  ModalHeaderModel,
  ModalFooterModel,
} from 'src/app/shared/components/modals/models/modal.model';
import { Data } from 'src/app/shared/share.data.component';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss'],
})
export class ProductEditComponent implements OnInit {
  productForm!: FormGroup;
  modalHeader!: ModalHeaderModel;
  modalFooter!: ModalFooterModel;
  item!: any;
  image!: string[];
  files!: string[];
  constructor(
    private _productService: ProductAPI,
    private fb: FormBuilder,
    private route: Router,
    private ngbActiveModal: NgbActiveModal
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    console.log(this.item);
  }

  ngOnInit(): void {
    this.install();
    this.geturlImage();
  }

  geturlImage() {
    this.image = [];
    this.item.image.split(';').forEach((element: any) => {
      this.image.push(this.linkImage(this.item.id, element));
    });
  }

  linkImage(id: string, url: string) {
    var urlImage = Data.baseurl + 'Files/Images/Products/' + id + '/' + url;
    return urlImage;
  }

  install() {
    this.productForm = this.fb.group({
      id: [this.item ? this.item.id : '', [Validators.required]],
      code: [this.item ? this.item.code : '', [Validators.required]],
      name: [this.item ? this.item.name : '', [Validators.required]],
      quantity: [this.item ? this.item.quantity : '', [Validators.required]],
      files: [null, [Validators.required]],
    });
    this.modalHeader = new ModalHeaderModel();
    this.modalHeader.title = this.item
      ? `[Update] ${this.productForm.get('id')?.value}`
      : `[Add]`;
    this.modalFooter = new ModalFooterModel();
    this.modalFooter.title = 'Save';
  }

  save(event: any) {
    if (this.item) {
      this.update();
      return;
    }
    this.insert();
  }
  close(event: any) {
    console.log(event);
    this.ngbActiveModal.close();
  }

  loadFile(abc: any) {
    this.files = [...(abc.target.files || [])];
    console.log(abc.target.files);
  }

  createFormData() {
    var formData: any = new FormData();
    formData.append('id', this.productForm.get('id')!.value);
    formData.append('code', this.productForm.get('code')!.value);
    formData.append('name', this.productForm.get('name')!.value);
    formData.append('quantity', this.productForm.get('quantity')!.value);

    (this.files || []).forEach((x) => {
      formData.append('files', x);
    });
    return formData;
  }

  insert() {
    // if (this.insertForm.dirty && this.insertForm.valid) {
    this._productService.saveProduct(this.createFormData()).subscribe(
      (data) => {
        this.ngbActiveModal.close();
      },
      (e) => {
        console.log(e);
      }
    );
    // }
    // if(this.url == '/home/insert')
    // {

    // }
    // if(this.url == "/home/update/"+this.idProduct){
    //   this.Update();
    // }
    // if(this.url == "/home/delete/"+this.idProduct){
    //   this.Delete();
    // }
  }

  update() {
    // if (this.insertForm.dirty && this.insertForm.valid) {
    this._productService.updateProduct(this.createFormData()).subscribe(
      (data) => {
        console.log(data);
        this.ngbActiveModal.close();
      },
      (e) => {
        console.log(e);
      }
    );
    // }
  }
}
