import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { LoginComponent } from './views/login/login.component';

import { FilterPipe } from './Pipes/filter';
import { AddSoundsComponent } from './views/add-sounds/add-sounds.component';
import { DeleteSoundsComponent } from './views/delete-sounds/delete-sounds.component';
import { DisplaySoundsComponent } from './views/display-sounds/display-sounds.component';
import { UserProfileService } from './business/UserProfile/UserProfile.service';

@NgModule({
  declarations: [
    AppComponent,
    FilterPipe,
    AddSoundsComponent,
    DeleteSoundsComponent,
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
      {
        path: 'delete-sounds',
        component: DeleteSoundsComponent
      },
      { path: '',    redirectTo: '/display-sounds', pathMatch: 'full'  }
    ])
  ],
  providers: [ UserProfileService ],
  bootstrap: [AppComponent]
})
export class AppModule { }

