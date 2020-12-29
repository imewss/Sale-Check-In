import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService, SelectItem } from 'primeng/api';
import { Amphur } from '../model/amphur.model';
import { CheckInSaveModel } from '../model/check-in-save.model';
import { District } from '../model/district.model';
import { Province } from '../model/province.model';
import { ShopType } from '../model/shop-type.model';

@Component({
  selector: 'app-check-in',
  templateUrl: './check-in.component.html',
  styleUrls: ['./check-in.component.css'],
  providers: [
    MessageService
  ]
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
  amphurSelectedItems: Array<SelectItem>
  city1: any = null;
  city0: any = null;
  test: SelectItem;
  newCustomer: SelectItem;
  checkInSaveModel: CheckInSaveModel;


  isProvinceSelected = false;
  isAmphurSelected = false;

  constructor(private _formBuilder: FormBuilder,
    private _router: Router,
    private _http: HttpClient,
    private _messageService: MessageService) { }

  ngOnInit() {
    this.provinceSelectItems = {} as Array<SelectItem>;
    this.initForm();
    this.findMe();
    this.loadEnum();

  }

  initForm() {
    this.checkInSaveModel = {} as CheckInSaveModel;
    this.checkInForm = this._formBuilder.group({
      name: new FormControl(null, Validators.required),
      shopType: new FormControl(null, Validators.required),
      selectedCustomerType: new FormControl(null, Validators.required),
      province: new FormControl(null, Validators.required),
      amphur: new FormControl({ value: null, disable: !this.isProvinceSelected }, Validators.required),
      district: new FormControl(null, Validators.required),
      selectedReport: new FormControl(null, Validators.required),
      note: new FormControl(null)
    });

    this.checkInForm.valueChanges.subscribe(e => {
      this.checkInForm.setValue(e, { emitEvent: false });
    });

    this.checkInForm.controls['province'].valueChanges.subscribe(res => {
      if (res) {
        this.isProvinceSelected = true;
        this.amphurSelectedItems = [];
        // call api
        this.loadAmphur(this.checkInForm.controls['province'].value.value);
      }
    });

    this.checkInForm.controls['amphur'].valueChanges.subscribe(res => {
      if (res) {
        this.isAmphurSelected = true;
        this.districtSelectItems = [];
        // call api
        this.loadDistrict(this.checkInForm.controls['amphur'].value.value);
      }
    });

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
    this.checkInSaveModel.latitude = this.currentLat;
    this.checkInSaveModel.longitude = this.currentLong;
    this.checkInSaveModel.shopName = this.checkInForm.controls['name'].value;
    this.checkInSaveModel.shopType = this.checkInForm.controls['shopType'].value.label;
    this.checkInSaveModel.customerType = this.checkInForm.controls['selectedCustomerType'].value;
    this.checkInSaveModel.province = this.checkInForm.controls['province'].value.label;
    this.checkInSaveModel.amphur = this.checkInForm.controls['amphur'].value.label;
    this.checkInSaveModel.district = this.checkInForm.controls['district'].value.label;
    this.checkInSaveModel.reportType = this.checkInForm.controls['selectedReport'].value;
    this.checkInSaveModel.note = this.checkInForm.controls['note'].value;
    this.checkInSaveModel.userId = Number(localStorage.getItem('userId'));

    if (this.url) {
      this.checkInSaveModel.receiptFile = this.url.split(',')[1];
      this.checkInSaveModel.mimeType = this.url.split(':')[1].split(';')[0];
    }

    this.addCheckInData(this.checkInSaveModel);
  }

  addCheckInData(checkInSaveModel: CheckInSaveModel) {
    let summary = "Add Check In Info";
    console.log(checkInSaveModel);
    return this._http.post<any>('api/CheckIn/CheckIn', checkInSaveModel)
      .subscribe((res) => {
        if (res) {
          this._messageService.add({ severity: 'success', summary: summary, detail: 'Check In Info is added.' });
          this._router.navigate(['/CheckInSuccess']);
        }
      }, err => {
        this._messageService.add({ severity: 'error', summary: summary, detail: 'Can\'t add check in info.' });
      })
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

  isUserAuthenticated() {
    const token: string = localStorage.getItem("jwt");
    if (token) {
      return true;
    } else {
      return false;
    }
  }

  loadEnum() {
    var provinceArray = [];
    var shopTypeArray = [];
    // province
    this._http.get('api/CheckIn/Province').subscribe((res: Array<Province>) => {
      res.forEach(element => {
        provinceArray.push({ label: element.p_Name, value: element.p_Id });
      });
      this.provinceSelectItems = provinceArray;

    });

    // shop type
    this._http.get('api/CheckIn/ShopType').subscribe((res: Array<ShopType>) => {
      res.forEach(element => {
        shopTypeArray.push({ label: element.shopTypeName, value: element.shopTypeId });
      });

      this.shopTypeSelectItems = shopTypeArray;
    })

  }

  loadAmphur(provinceId: Number) {
    this.amphurSelectedItems = [];
    console.log('provinceID', provinceId);
    let aumphurArray = [];
    this._http.post('api/CheckIn/Amphur', provinceId).subscribe((res: Array<Amphur>) => {
      res.forEach(element => {
        aumphurArray.push({ label: element.amphur_name, value: element.amphur_Id });
      });
      this.amphurSelectedItems = aumphurArray;

    });
  }

  loadDistrict(amphurId: Number) {
    this.districtSelectItems = [];
    let districtArray = [];
    console.log(amphurId, 'amphurId');

    this._http.post('api/CheckIn/District', amphurId).subscribe((res: Array<District>) => {
      res.forEach(element => {
        districtArray.push({ label: element.district_name, value: element.district_Id });
      });
      this.districtSelectItems = districtArray;

    });
  }
}
