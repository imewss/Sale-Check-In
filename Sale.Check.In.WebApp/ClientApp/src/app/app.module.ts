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
import { MessageModule } from 'primeng/message';
import { MessagesModule } from 'primeng/messages';
import { ToastModule } from 'primeng/toast';
import { BlockUIModule } from 'primeng/blockui';
import { LoadingComponent } from './loading/loading.component';
import { HttpLoadingInterceptor } from './interceptors/http.interceptor';
import { CookieService } from 'ngx-cookie-service';
import { JwtModule } from '@auth0/angular-jwt'
import { AuthGuard } from './guards/auth-guard.service';

export function tokenGetter() {
  return localStorage.getItem('jwt');
}

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    LoginComponent,
    CheckInComponent,
    CheckInSuccessComponent,
    HeaderComponent,
    CheckInReportComponent,
    LoadingComponent
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
    MessagesModule,
    MessageModule,
    ToastModule,
    BlockUIModule,
    RouterModule.forRoot([
      { path: '', component: LoginComponent, pathMatch: 'full' },
      { path: 'CheckIn', component: CheckInComponent, pathMatch: 'full', canActivate: [AuthGuard] },
      { path: 'CheckInSuccess', component: CheckInSuccessComponent, pathMatch: 'full', canActivate: [AuthGuard] },
      { path: 'CheckInReport', component: CheckInReportComponent, pathMatch: 'full', canActivate: [AuthGuard] }
    ]),
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ["localhost:44388"],
        disallowedRoutes: []
      }
    })
  ],
  providers: [[AuthGuard]
    ,
  [CookieService, {
    multi: true,
    provide: HTTP_INTERCEPTORS,
    useClass: HttpLoadingInterceptor
  }]
  ],
  exports: [
    HeaderComponent,
    LoadingComponent
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
