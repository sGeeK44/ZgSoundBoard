import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { LoginComponent } from './Login/login.component';

import { FilterPipe } from './Pipes/filter';
import { AddSoundsComponent } from './add-sounds/add-sounds.component';
import { DisplaySoundsComponent } from './display-sounds/display-sounds.component';

@NgModule({
  declarations: [
    AppComponent,
    FilterPipe,
    AddSoundsComponent,
    DisplaySoundsComponent,
    LoginComponent
  ],
  imports: [
    HttpModule,
    BrowserModule,
    FormsModule,
    RouterModule.forRoot([
      {
        path: 'display-sounds',
        component: DisplaySoundsComponent
      },
      {
        path: 'add-sounds',
        component: AddSoundsComponent
      },
      { path: '',    redirectTo: '/display-sounds', pathMatch: 'full'  }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

