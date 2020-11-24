export interface CheckInHistoryListModel {
  pageIndex: number;
  totalPage: number;
  collection: Array<CheckInHistoryModel>;
}

export interface CheckInHistoryModel {
  img: string;
  shopName: string;
  Date: Date;
}
