import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SelectItem } from 'primeng/api';

@Component({
  selector: 'app-check-in',
  templateUrl: './check-in.component.html',
  styleUrls: ['./check-in.component.css']
})
export class CheckInComponent implements OnInit {

  // lat lon
  currentLat: any;
  currentLong: any;

  //upload image
  url: any;
  msg: string;
  isImage: boolean;

  // form
  checkInForm: FormGroup;
  shopTypeSelectItems: Array<SelectItem>;
  provinceSelectItems: Array<SelectItem>;
  districtSelectItems: Array<SelectItem>;
  customerTypeSelectItems: Array<SelectItem>;
  city1: any = null;
  city0: any = null;
  test: SelectItem;
  newCustomer: SelectItem;

  constructor(private _formBuilder: FormBuilder,
    private _router: Router) { }

  ngOnInit() {
    this.initForm();
    this.findMe();
    this.initcustomerTypeSelectItems();
  }

  initForm() {
    this.checkInForm = this._formBuilder.group({
      name: new FormControl(null, Validators.required),
      shopType: new FormControl(null, Validators.required),
      selectedCustomerType: new FormControl(null, Validators.required),
      province: new FormControl(null, Validators.required),
      district: new FormControl(null, Validators.required),
      subDistrict: new FormControl(null, Validators.required),
      report: new FormControl(null, Validators.required),
      note: new FormControl(null)
    });
  }

  initcustomerTypeSelectItems() {
    this.customerTypeSelectItems = {} as Array<SelectItem>;
    this.test = {} as SelectItem;
    this.newCustomer = {} as SelectItem;

   this.test.label = "ลูกค้าเก่า";
   this.test.value = "ลูกค้าเก่า";
   this.newCustomer.label = "ลูกค้าใหม่";
   this.newCustomer.value = "ลูกค้าใหม่";
   this.customerTypeSelectItems = [this.test];
   this.customerTypeSelectItems.push(this.newCustomer);
  }

  selectFile(event) {
    if (!event.target.files[0] || event.target.files[0].length == 0) {
      this.msg = 'You must select an image';
      return;
    }

    var mimeType = event.target.files[0].type;

    if (mimeType.match(/image\/*/) == null) {
      this.msg = "Only images are supported";
      return;
    }

    var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);

    reader.onload = (_event) => {
      this.msg = "";
      this.url = reader.result;
      this.isImage = true;
    }
  }

  onCheckIn() {
    // need to implement
    this._router.navigate(['/CheckInSuccess']);
  }

  findMe() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.showPosition(position);
      });
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }

  showPosition(position) {
    this.currentLat = position.coords.latitude;
    this.currentLong = position.coords.longitude;

  }

}
