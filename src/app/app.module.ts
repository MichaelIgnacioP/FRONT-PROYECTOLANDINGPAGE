import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignupComponent } from './pages/signup/signup.component';
import { SigninComponent } from './pages/signin/signin.component';
import { LandingpageComponent } from './pages/landingpage/landingpage.component';
import { ContactComponent } from './pages/contact/contact.component';
import { AdminComponent } from './layout/admin/admin.component';

import { AuthGuard } from './guards/auth.guard';
import { ApiService } from './services/api.service';

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    SigninComponent,
    LandingpageComponent,
    ContactComponent,
    AdminComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiService,
      multi: true

    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
