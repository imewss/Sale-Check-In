import { Component, OnInit } from '@angular/core';
import { LoadingService } from '../services/loading.service';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html'
})
export class LoadingComponent implements OnInit {
  isLoadShow = false;
  constructor(private readonly loadingService: LoadingService) { }

  ngOnInit() {
    this.loadingService.isLoad.subscribe((res) => {
      this.isLoadShow = res;
    });
  }

}
