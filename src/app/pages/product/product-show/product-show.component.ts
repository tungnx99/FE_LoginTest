import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AccountAPI } from 'src/app/service/service.accountapi';
import { ProductAPI } from 'src/app/service/service.productapi';
import { Data } from 'src/app/shared/share.data.component';
import { ProductEditComponent } from '../product-edit/product-edit.component';

@Component({
  selector: 'app-product-show',
  templateUrl: './product-show.component.html',
  styleUrls: ['./product-show.component.scss'],
})
export class ProductShowComponent implements OnInit {
  productForm!: FormGroup;
  data!: any;
  baseurl: string = Data.baseurl;
  item!: any;
  image!: any;
  files!: string[];
  closeResult = '';

  constructor(
    private fb: FormBuilder,
    private api: ProductAPI,
    private modalService: NgbModal
  ) {}

  async ngOnInit() {
    this.productForm = this.fb.group({
      id: [null, [Validators.required]],
      code: [null, [Validators.required]],
      name: [null, [Validators.required]],
      quantity: [null, [Validators.required]],
      files: [null, [Validators.required]],
    });

    this.refresh();
  }

  async refresh() {
    await this.api.getProducts({}, {}).subscribe((res: any) => {
      if (res.status == 0) {
        this.data = res.data;
        this.item = this.data.data[0];
      }
    });

    if (!localStorage.getItem('token')) {
      var button = document.getElementById('showitem');
      if (button) button.hidden = true;
    }
  }

  updateitem(item: any) {
    if (item) {
      this.item = item;
      this.image = [];
      item.image.split(';').forEach((element: any) => {
        this.image.push(this.linkImage(item.id, element));
      });
      // if (this.item) {
      // this.showfile = new FileList();
      // }
    }

    if (item == null) {
      this.item = {
        id: '',
        code: '',
        name: '',
        quantity: '',
        image: null,
      };
    }
  }

  linkImage(id: string, url: string) {
    var urlImage = Data.baseurl + 'Files/Images/Products/' + id + '/' + url;
    return urlImage;
  }

  addImage(image: any) {
    // this.files.items.add(new File(['foo'], image.target.src));
    // this.showfile = this.files.files;
    // var files = document.forms[0]['files'];
    // files = this.files;
    // files! = this.showfile;
    // this.productForm.value.files = this.files.files;
    // console.log(this.files!);
  }

  delete(id: string) {
    // var body = {
    //   id: id
    // };
    if (confirm('Are you sure?')) {
      this.api.deleteProduct(id).subscribe((e) => {
        console.log(e);
        this.refresh();
      });
    }
  }

  open(item: any) {
    console.log(item);
    var modalRef = this.modalService.open(ProductEditComponent, {
      ariaLabelledBy: 'modal-basic-title',
    });
    modalRef.componentInstance.item = item;
    modalRef.result.then(
      (result) => {
        console.log(result);
        this.refresh();
      },
      (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      }
    );
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
}
