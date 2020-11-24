import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ButtonModule } from 'primeng/button';
import { CheckInComponent } from './check-in/check-in.component';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { CheckInSuccessComponent } from './check-in-success/check-in-success.component';
import { HeaderComponent } from './header/header.component';
import { CheckInReportComponent } from './check-in-report/check-in-report.component';
import { MenuModule } from 'primeng/menu';
import { TableModule } from 'primeng/table';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    LoginComponent,
    CheckInComponent,
    CheckInSuccessComponent,
    HeaderComponent,
    CheckInReportComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    ButtonModule,
    InputTextModule,
    ReactiveFormsModule,
    DropdownModule,
    BrowserModule,
    BrowserAnimationsModule,
    RadioButtonModule,
    InputTextareaModule,
    MenuModule,
    TableModule,
    RouterModule.forRoot([
      { path: '', component: LoginComponent, pathMatch: 'full' },
      { path: 'CheckIn', component: CheckInComponent, pathMatch: 'full' },
      { path: 'CheckInSuccess', component: CheckInSuccessComponent, pathMatch: 'full' },
      { path: 'CheckInReport', component: CheckInReportComponent, pathMatch: 'full' }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
