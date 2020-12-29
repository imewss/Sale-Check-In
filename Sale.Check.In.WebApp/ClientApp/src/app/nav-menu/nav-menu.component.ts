import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent implements OnInit {

  items: MenuItem[];

  constructor(private _router: Router) {

  }

  ngOnInit() {
    this.items = [
      { label: 'หน้าหลัก', icon: 'pi pi-fw pi-home', command: () => { this._router.navigate(['/CheckIn']); } },
      { label: 'ประวัติการเช็คอิน', icon: 'pi pi pi-book', command: () => { this._router.navigate(['/CheckInReport']); } },
      { label: 'ลงชื่อออก', icon: 'pi pi-sign-out', command: () => { this.onSignOut(); } }
    ];
  }

  onSignOut() {
    localStorage.removeItem("jwt");
    localStorage.removeItem("userId");
    this._router.navigate(['/']);
  }
}

