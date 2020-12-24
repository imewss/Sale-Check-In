import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-check-in-success',
  templateUrl: './check-in-success.component.html',
  styleUrls: ['./check-in-success.component.css']
})
export class CheckInSuccessComponent implements OnInit {

  constructor( private _router: Router) { }

  ngOnInit() {
  }

  onBackToCheckIn() {
    this._router.navigate(['/CheckIn']);
  }

  processReceiptImage(imageInput: any) {
    if (imageInput.files.length > 0) {
      let file: File = imageInput.files[0];
      let reader = new FileReader();
      reader.addEventListener('load', (event: any) => {
        // this.addEditItem.receiptImage = event.target.result;
        // this.addEditForm.controls['receiptFile'].setValue(this.addEditItem.receiptImage.split(',')[1]);
        // this.addEditForm.controls['mimeType'].setValue(this.addEditItem.receiptImage.split(':')[1].split(';')[0]);
      });

      reader.readAsDataURL(file);
    }
  }

}
