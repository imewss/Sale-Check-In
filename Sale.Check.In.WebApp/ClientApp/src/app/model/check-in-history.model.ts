import { SafeResourceUrl } from "@angular/platform-browser";

export interface CheckInHistoryListModel {
  pageIndex: number;
  totalPage: number;
  collection: Array<CheckInHistoryModel>;
}

export interface CheckInHistoryModel {
  receiptFile: string
  mimeType: string;
  img: string;
  shopName: string;
  createdDate: Date;
  imageFormatted: SafeResourceUrl;
  latitude: number;
  longitude: number;
  createdDateFormatted: string;

}
