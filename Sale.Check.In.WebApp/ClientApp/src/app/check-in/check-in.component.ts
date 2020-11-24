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
  //upload image
  url: any;
  msg: string;
  isImage: boolean;

  // form
  checkInForm: FormGroup;
  shopTypeSelectItems: Array<SelectItem>;
  provinceSelectItems: Array<SelectItem>;
  districtSelectItems: Array<SelectItem>;

  constructor(private _formBuilder: FormBuilder,
    private _router: Router) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.checkInForm = this._formBuilder.group({
      name: new FormControl(null, Validators.required),
      shopType: new FormControl(null, Validators.required),
      customerType: new FormControl(null, Validators.required),
      province: new FormControl(null, Validators.required),
      district: new FormControl(null),
      subDistrict: new FormControl(null),
      report: new FormControl(null),
      note: new FormControl(null)
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
    // need to implement
    this._router.navigate(['/CheckInSuccess']);
  }

}
