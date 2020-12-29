import { HttpClient } from '@angular/common/http';
import { Component, OnInit, SecurityContext } from '@angular/core';
import { Router } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { CheckInHistoryModel } from '../model/check-in-history.model';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-check-in-success',
  templateUrl: './check-in-success.component.html',
  styleUrls: ['./check-in-success.component.css']
})
export class CheckInSuccessComponent implements OnInit {
  imageFormatted: SafeResourceUrl;
  shopName: string;
  createdDateFormmatted: String;
  lattitude: number;
  longitude: number;


  constructor(private _router: Router,
    private _http: HttpClient,
    private _sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.loadData();
  }

  onBackToCheckIn() {
    this._router.navigate(['/CheckIn']);
  }

  loadData() {
    this._http.get<any>('api/CheckIn/LatestCheckIn').subscribe((res: CheckInHistoryModel) => {
      this.imageFormatted = this._sanitizer.sanitize(SecurityContext.HTML, this._sanitizer.bypassSecurityTrustHtml('data:' + res.mimeType + ';base64,'
        + res.receiptFile));

        this.shopName = res.shopName;
        this.lattitude = res.latitude;
        this.longitude = res.longitude;
        this.createdDateFormmatted = this.getDisplayDateTime(res.createdDate, 'd MMM yyyy hh:mm', 'th_TH');
        console.log('createdDateFormmatted', this.createdDateFormmatted);

    });
  }

  getDisplayDateTime(datetime: any, format = 'd MMM yyyy H:mm', locale = 'en_US'): string {
    if (datetime == null || datetime == undefined) {
      return '-';
    }

    if (locale == 'th_TH') {
      const monthNames = ["มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน", "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"];
      const dd = new Date(datetime);
      return dd.getDate() + ' ' + monthNames[dd.getMonth()] + ' ' + (dd.getFullYear() + 543) + ' ' + dd.getHours() + ':' + dd.getMinutes() + ' น.';
    }

    return formatDate(datetime, format, locale);
  }
}
