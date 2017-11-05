import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { LoginComponent } from './views/login/login.component';

import { FilterPipe } from './Pipes/filter';
import { SoundComponent } from './views/sound/sound.component';
import { SoundsListComponent } from './views/sounds-list/sounds-list.component'
import { AddSoundsComponent } from './views/add-sounds/add-sounds.component';
import { DeleteSoundsComponent } from './views/delete-sounds/delete-sounds.component';
import { DisplaySoundsComponent } from './views/display-sounds/display-sounds.component';
import { UserProfileService } from './business/UserProfile/UserProfile.service';
import { ApiClient } from './core/ApiClient';
import { DisplayFavoriteSoundsComponent } from './views/display-favorite-sounds/display-favorite-sounds.component';

@NgModule({
  declarations: [
    AppComponent,
    FilterPipe,
    SoundComponent,
    SoundsListComponent,
    AddSoundsComponent,
    DeleteSoundsComponent,
    DisplaySoundsComponent,
    DisplayFavoriteSoundsComponent,
    LoginComponent
  ],
  imports: [
    HttpModule,
    BrowserModule,
    FormsModule,
    RouterModule.forRoot([
      {
        path: 'display-favorite-sounds',
        component: DisplayFavoriteSoundsComponent
      },
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
      { path: '',    redirectTo: '/display-favorite-sounds', pathMatch: 'full'  }
    ])
  ],
  providers: [ UserProfileService, ApiClient ],
  bootstrap: [AppComponent]
})
export class AppModule { }

