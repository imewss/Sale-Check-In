import { Component, OnInit } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';
import { CheckInHistoryListModel, CheckInHistoryModel } from '../model/check-in-history.model';

@Component({
  selector: 'app-check-in-report',
  templateUrl: './check-in-report.component.html',
  styleUrls: ['./check-in-report.component.scss']
})
export class CheckInReportComponent implements OnInit {
  checkInHistory: CheckInHistoryListModel;
  cols: any[];
  totalRecords: number;
  loading: boolean;

  constructor() { }

  ngOnInit() {
    this.initList();
    this.checkInHistory = {} as CheckInHistoryListModel;
    this.checkInHistory.collection = {} as Array<CheckInHistoryModel>;

    this.checkInHistory = {
      collection: [{
        img: '',
        Date: new Date,
        shopName: 'Test'
      }],
      pageIndex: 1,
      totalPage: 0
    };
  }

  initList() {
    this.cols = [
      { field: 'img', header: 'รูปภาพ' },
      { field: 'shopName', header: 'ร้านค้า' },
      { field: 'createDate', header: 'วันที่' }
    ];
  }

  loadCustomers(event: LazyLoadEvent) {
    this.loading = true;

    //in a real application, make a remote request to load data using state metadata from event
    //event.first = First row offset
    //event.rows = Number of rows per page
    //event.sortField = Field name to sort with
    //event.sortOrder = Sort order as number, 1 for asc and -1 for dec
    //filters: FilterMetadata object having field as key and filter value, filter matchMode as value

    //imitate db connection over a network
    setTimeout(() => {
      if (this.checkInHistory) {
        this.checkInHistory.collection = this.checkInHistory.collection.slice(event.first, (event.first + event.rows));
        this.loading = false;
      }
    }, 1000);
  }


}
