import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { TestComponent } from './test/test.component';
import { ProjectsComponent } from './projects/projects.component';
import { ProjectComponent } from './project/project.component';
import { HttpClientModule } from '@angular/common/http';
import { LogInSignUpComponent } from './log-in-sign-up/log-in-sign-up.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FinishedProjectsComponent } from './finished-projects/finished-projects.component';
import { FooterComponent } from './footer/footer.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    TestComponent,
    ProjectsComponent,
    ProjectComponent,
    LogInSignUpComponent,
    FinishedProjectsComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }


