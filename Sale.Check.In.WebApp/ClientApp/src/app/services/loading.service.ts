import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private isLoadSubject = new Subject<boolean>();
  isLoad = this.isLoadSubject.asObservable();

  constructor() { }

  setLoad(isLoad: boolean) {
    this.isLoadSubject.next(isLoad);
  }

}
