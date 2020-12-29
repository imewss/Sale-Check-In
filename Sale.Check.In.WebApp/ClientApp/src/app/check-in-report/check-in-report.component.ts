import { HttpClient } from '@angular/common/http';
import { Component, OnInit, SecurityContext } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';
import { CheckInHistoryListModel, CheckInHistoryModel } from '../model/check-in-history.model';
import { DomSanitizer } from '@angular/platform-browser';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-check-in-report',
  templateUrl: './check-in-report.component.html',
  styleUrls: ['./check-in-report.component.scss']
})
export class CheckInReportComponent implements OnInit {
  checkInHistory: CheckInHistoryListModel;
  cols: any[];
  rowsPerPageOptions: Array<number> = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000];
  pageIndex = 1;
  pageSize = 50;
  totalRecords = 0;
  sortField = 'CreatedDate';
  sortOrder = 1;

  constructor(private _http: HttpClient,
              private _sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.initList();
    this.checkInHistory = {} as CheckInHistoryListModel;
    this.checkInHistory.collection = {} as Array<CheckInHistoryModel>;

    this.searchData(true);
  }

  initList() {
    this.cols = [
      { field: 'imageFormatted', header: 'รูปภาพ' },
      { field: 'shopName', header: 'ร้านค้า' },
      { field: 'createdDateFormatted', header: 'วันที่' }
    ];
  }

  loadData(event: LazyLoadEvent) {
    this.pageIndex = event.first / event.rows + 1;

    this.pageSize = event.rows;

    this.sortField = event.sortField;

    this.sortOrder = event.sortOrder;

    this.searchData();
  }

  searchData(resetPageIndex = false) {
    if (resetPageIndex)
      this.pageIndex = 1;

    let userId = localStorage.getItem('userId');
    let sortField = this.getSortField();
    this.sortOrder == 1
    let url = 'api/CheckIn/CheckInHistories?page=' + this.pageIndex +
      '&limit=' + this.pageSize +
      '&userId=' + userId +
      '&sortField=' + sortField +
      '&isOrderByAsc=' + this.sortOrder;

    this._http.get<any>(url).subscribe((res) => {
      if (res) {
        this.checkInHistory = res;

        this.checkInHistory.collection.forEach(element => {
        element.imageFormatted = this._sanitizer.sanitize(SecurityContext.HTML, this._sanitizer.bypassSecurityTrustHtml('data:' + element.mimeType + ';base64,'
        + element.receiptFile));
        element.createdDateFormatted = this.getDisplayDateTime(element.createdDate, 'd MMM yyyy hh:mm', 'th_TH');
        });


        this.totalRecords = this.pageSize * res.totalPage;
        //  this.updateLocation();
      }
    }, err => {
      console.log('err', err);
    });
  }



  getSortField() {
    switch (this.sortField) {

      case 'shopName':
        return 'shopName';

      case 'createdDate':
        return 'createdDate';
    }

    return 'createdDate';
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
