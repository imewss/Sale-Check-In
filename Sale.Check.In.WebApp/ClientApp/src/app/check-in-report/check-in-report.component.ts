import { Component, OnInit } from '@angular/core';
import { CheckInHistoryListModel, CheckInHistoryModel } from '../model/check-in-history.model';

@Component({
  selector: 'app-check-in-report',
  templateUrl: './check-in-report.component.html',
  styleUrls: ['./check-in-report.component.css']
})
export class CheckInReportComponent implements OnInit {
  checkInHistory: CheckInHistoryListModel;

  constructor() { }

  ngOnInit() {
    this.checkInHistory = {} as CheckInHistoryListModel;
    this.checkInHistory.collection = {} as Array<CheckInHistoryModel>;

    this.checkInHistory = {
      collection: [{
        img : '',
        Date: new Date,
        shopName: 'Test'
      }],
      pageIndex: 1,
      totalPage: 0
    };
  }

}
