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

}
